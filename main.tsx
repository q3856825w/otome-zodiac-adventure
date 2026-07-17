import { useMemo, useState } from "react";
import { characters as baseCharacters } from "./data/characters";
import { scenes } from "./data/scenes";
import HomePage from "./components/HomePage";
import SetupPage from "./components/SetupPage";
import CharacterSelect from "./components/CharacterSelect";
import StoryPage from "./components/StoryPage";
import EndingPage from "./components/EndingPage";
import CollectionPage from "./components/CollectionPage";
import { applyChoice, createInitialState, createPlayer, getActiveCharacter, resolveEnding, selectRoute } from "./utils/gameLogic";
import { clearSave, loadCollection, loadGame, saveCollection, saveGame } from "./utils/storage";
import type { Choice, GameState, PersonalityType, RelationshipState, ZodiacSign } from "./types";

type View = "home" | "setup" | "select" | "story" | "ending" | "collection";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [state, setState] = useState<GameState | null>(null);
  const [collection, setCollection] = useState<string[]>(loadCollection());
  const currentScene = useMemo(() => scenes.find((scene) => scene.id === state?.currentSceneId), [state?.currentSceneId]);
  const currentEnding = useMemo(
    () => state?.characters.flatMap((character) => character.endings).find((ending) => ending.id === state.currentEndingId),
    [state]
  );

  const startGame = (name: string, personalityType: PersonalityType, zodiacSign: ZodiacSign) => {
    const fresh = createInitialState(createPlayer(name, personalityType, zodiacSign));
    setState(fresh);
    setView("select");
  };

  const migrateSave = (loaded: GameState): GameState => ({
    ...loaded,
    player: { ...loaded.player, zodiacSign: loaded.player.zodiacSign ?? "雙魚座" },
    characters: loaded.characters.map((character) => ({
      ...character,
      relationshipState: character.relationshipState ?? ("stranger" as RelationshipState),
    })),
    unlockedHiddenEvents: loaded.unlockedHiddenEvents ?? [],
    dialogueHistory: loaded.dialogueHistory ?? [],
    lastChanges: loaded.lastChanges ?? [],
  });

  const loadExisting = () => {
    const loaded = loadGame();
    if (loaded) {
      const migrated = migrateSave(loaded);
      setState(migrated);
      setView(migrated.currentEndingId ? "ending" : migrated.currentSceneId ? "story" : "select");
    }
  };

  const chooseCharacter = (characterId: string) => {
    if (!state) return;
    const firstSceneId = characterId === "capricorn" ? "capricorn-adult-prologue" : `${characterId}-0-start`;
    const next = selectRoute(state, characterId, firstSceneId);
    setState(next);
    setView("story");
  };

  const chooseOption = (choice: Choice) => {
    if (!state) return;
    const changed = applyChoice(state, choice);
    const endingId = changed.currentSceneId ? null : resolveEnding(changed);
    const ended = {
      ...changed,
      currentEndingId: endingId,
      unlockedEndings: endingId ? Array.from(new Set([...changed.unlockedEndings, endingId])) : changed.unlockedEndings,
    };

    if (endingId) {
      saveCollection([endingId]);
      setCollection(loadCollection());
      setState(ended);
      setView("ending");
    } else {
      setState(changed);
    }
  };

  const handleSave = () => {
    if (state) saveGame(state);
  };

  const reset = () => {
    clearSave();
    setState(null);
    setView("home");
  };

  return (
    <main className="app-shell">
      <div className="phone-frame">
        {view === "home" && (
          <HomePage
            onStart={() => setView("setup")}
            onLoad={loadExisting}
            onCharacters={() => setView("select")}
            onCollection={() => setView("collection")}
            hasSave={Boolean(loadGame())}
          />
        )}
        {view === "setup" && <SetupPage onStart={startGame} onBack={() => setView("home")} />}
        {view === "select" && (
          <CharacterSelect
            characters={state?.characters ?? baseCharacters}
            onSelect={state ? chooseCharacter : undefined}
            onBack={() => setView("home")}
          />
        )}
        {view === "story" && state && currentScene && (
          <StoryPage
            state={state}
            scene={currentScene}
            character={getActiveCharacter(state)}
            onChoice={chooseOption}
            onSave={handleSave}
            onReset={reset}
          />
        )}
        {view === "ending" && state && currentEnding && (
          <EndingPage
            ending={currentEnding}
            character={getActiveCharacter(state)}
            unlocked={state.unlockedEndings.includes(currentEnding.id)}
            onSave={handleSave}
            onRestart={() => setView("select")}
            onCollection={() => setView("collection")}
          />
        )}
        {view === "collection" && (
          <CollectionPage characters={baseCharacters} unlockedEndingIds={collection} onBack={() => setView("home")} />
        )}
      </div>
    </main>
  );
}
