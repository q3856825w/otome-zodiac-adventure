import { useEffect, useMemo, useState } from "react";
import { characters as baseCharacters } from "./data/characters";
import { scenes } from "./data/scenes";
import HomePage from "./components/HomePage";
import SetupPage from "./components/SetupPage";
import CharacterSelect from "./components/CharacterSelect";
import StoryPage from "./components/StoryPage";
import EndingPage from "./components/EndingPage";
import CollectionPage from "./components/CollectionPage";
import ZodiacGuidePage from "./components/ZodiacGuidePage";
import { applyChoice, createInitialState, createPlayer, getActiveCharacter, resolveEnding, selectRoute } from "./utils/gameLogic";
import { clearSave, loadCollection, loadGame, loadPlayerProfile, saveCollection, saveGame, savePlayerProfile } from "./utils/storage";
import { getAudioDebugState, shouldAutoStartMusic, startBgm, stopBgm, subscribeAudioDebug } from "./utils/audio";
import type { BloodType, Choice, GameState, PersonalityType, RelationshipState, ZodiacSign } from "./types";

type View = "home" | "setup" | "zodiacGuide" | "select" | "story" | "ending" | "collection";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [state, setState] = useState<GameState | null>(null);
  const [collection, setCollection] = useState<string[]>(loadCollection());
  const [profile, setProfile] = useState(loadPlayerProfile());
  const [musicOn, setMusicOn] = useState(getAudioDebugState().musicPlaying);
  const currentScene = useMemo(() => scenes.find((scene) => scene.id === state?.currentSceneId), [state?.currentSceneId]);
  const currentEnding = useMemo(
    () => state?.characters.flatMap((character) => character.endings).find((ending) => ending.id === state.currentEndingId),
    [state]
  );

  useEffect(() => {
    const unsubscribe = subscribeAudioDebug((audio) => setMusicOn(audio.musicPlaying));
    const retryEvents: Array<keyof WindowEventMap> = ["click", "touchstart", "keydown"];
    let retryInstalled = false;

    const removeRetry = () => {
      if (!retryInstalled) return;
      retryEvents.forEach((eventName) => window.removeEventListener(eventName, retryStart));
      retryInstalled = false;
    };

    const retryStart = () => {
      if (!shouldAutoStartMusic()) {
        removeRetry();
        return;
      }
      void startBgm().then((started) => {
        if (started) removeRetry();
      });
    };

    const installRetry = () => {
      if (retryInstalled || !shouldAutoStartMusic()) return;
      retryInstalled = true;
      retryEvents.forEach((eventName) => window.addEventListener(eventName, retryStart, { passive: true }));
    };

    if (shouldAutoStartMusic()) {
      void startBgm().then((started) => {
        if (!started) installRetry();
      });
    }

    return () => {
      removeRetry();
      unsubscribe();
    };
  }, []);

  const toggleMusic = async () => {
    if (musicOn) {
      stopBgm();
      return;
    }
    await startBgm();
  };

  const startGame = (name: string, personalityType: PersonalityType, zodiacSign: ZodiacSign, bloodType: BloodType) => {
    const fresh = createInitialState(createPlayer(name, personalityType, zodiacSign, bloodType));
    const nextProfile = { heroineZodiac: zodiacSign, heroineBloodType: bloodType };
    savePlayerProfile(nextProfile);
    setProfile(nextProfile);
    setState(fresh);
    setView("zodiacGuide");
  };

  const migrateSave = (loaded: GameState): GameState => ({
    ...loaded,
    player: { ...loaded.player, zodiacSign: loaded.player.zodiacSign ?? "雙魚座", bloodType: loaded.player.bloodType ?? "O型" },
    playerProfile: loaded.playerProfile ?? {
      heroineZodiac: loaded.player.zodiacSign ?? "雙魚座",
      heroineBloodType: loaded.player.bloodType ?? "O型",
    },
    characters: loaded.characters.map((character) => ({
      ...character,
      relationshipState: character.relationshipState ?? ("stranger" as RelationshipState),
      boundary: character.boundary ?? (character.id === "pisces" ? 18 : 0),
      selfAwareness: character.selfAwareness ?? (character.id === "pisces" ? 12 : 0),
      overwhelm: character.overwhelm ?? (character.id === "pisces" ? 25 : 0),
      pride: character.pride ?? (character.id === "aries" ? 50 : character.id === "leo" ? 58 : 0),
      impulse: character.impulse ?? (character.id === "aries" ? 48 : 0),
      accountability: character.accountability ?? (character.id === "aries" ? 18 : 0),
      honesty: character.honesty ?? (character.id === "gemini" ? 18 : 0),
      avoidance: character.avoidance ?? (character.id === "gemini" ? 52 : 0),
      mask: character.mask ?? (character.id === "gemini" ? 58 : 0),
      abandonmentFear: character.abandonmentFear ?? (character.id === "gemini" ? 46 : 0),
      connection: character.connection ?? (character.id === "aquarius" ? 12 : 0),
      logicArmor: character.logicArmor ?? (character.id === "aquarius" ? 62 : 0),
      alienation: character.alienation ?? (character.id === "aquarius" ? 48 : 0),
      emotionalAcceptance: character.emotionalAcceptance ?? (character.id === "aquarius" ? 10 : 0),
      rulePressure: character.rulePressure ?? (character.id === "virgo" ? 58 : 0),
      careExpression: character.careExpression ?? (character.id === "virgo" ? 14 : 0),
      selfCompassion: character.selfCompassion ?? (character.id === "virgo" ? 10 : 0),
      control: character.control ?? (character.id === "virgo" ? 55 : 0),
      stabilityNeed: character.stabilityNeed ?? (character.id === "taurus" ? 54 : 0),
      possessiveness: character.possessiveness ?? (character.id === "taurus" ? 32 : 0),
      stubbornness: character.stubbornness ?? (character.id === "taurus" ? 50 : 0),
      expression: character.expression ?? (character.id === "taurus" ? 10 : 0),
      overthinking: character.overthinking ?? (character.id === "taurus" ? 36 : 0),
      spotlightNeed: character.spotlightNeed ?? (character.id === "leo" ? 62 : 0),
      vulnerability: character.vulnerability ?? (character.id === "leo" ? 8 : 0),
      authenticity: character.authenticity ?? (character.id === "leo" ? 14 : 0),
      balanceNeed: character.balanceNeed ?? (character.id === "libra" ? 62 : 0),
      decisiveness: character.decisiveness ?? (character.id === "libra" ? 10 : 0),
      biasAcceptance: character.biasAcceptance ?? (character.id === "libra" ? 8 : 0),
      socialMask: character.socialMask ?? (character.id === "libra" ? 58 : 0),
      freedomNeed: character.freedomNeed ?? (character.id === "sagittarius" ? 62 : 0),
      commitmentFear: character.commitmentFear ?? (character.id === "sagittarius" ? 52 : 0),
      returnDesire: character.returnDesire ?? (character.id === "sagittarius" ? 12 : 0),
      distanceRespect: character.distanceRespect ?? (character.id === "sagittarius" ? 18 : 0),
      suspicion: character.suspicion ?? (character.id === "scorpio" ? 58 : 0),
      possessiveFear: character.possessiveFear ?? (character.id === "scorpio" ? 44 : 0),
      boundaryRespect: character.boundaryRespect ?? (character.id === "scorpio" ? 12 : 0),
      vulnerableHonesty: character.vulnerableHonesty ?? (character.id === "scorpio" ? 8 : 0),
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
    const firstSceneId =
      characterId === "capricorn"
        ? "capricorn-adult-prologue"
        : characterId === "taurus"
          ? "taurus-deep-0-start"
        : characterId === "cancer"
          ? "cancer-deep-0-start"
        : characterId === "leo"
          ? "leo-deep-0-start"
        : characterId === "libra"
          ? "libra-deep-0-start"
        : characterId === "virgo"
          ? "virgo-deep-0-start"
        : characterId === "aquarius"
          ? "aquarius-deep-0-start"
        : characterId === "gemini"
          ? "gemini-deep-0-start"
        : characterId === "scorpio"
          ? "scorpio-deep-0-start"
        : characterId === "sagittarius"
          ? "sagittarius-deep-0-start"
        : characterId === "pisces"
          ? "pisces-deep-0-start"
          : `${characterId}-0-start`;
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
            onCharacters={() => setView("select")}
            onCollection={() => setView("collection")}
            musicOn={musicOn}
            onToggleMusic={toggleMusic}
          />
        )}
        {view === "setup" && <SetupPage onStart={startGame} onBack={() => setView("home")} initialProfile={profile} />}
        {view === "zodiacGuide" && state && (
          <ZodiacGuidePage
            characters={state.characters}
            heroineZodiac={state.playerProfile?.heroineZodiac ?? state.player.zodiacSign}
            heroineBloodType={state.playerProfile?.heroineBloodType ?? state.player.bloodType}
            onBack={() => setView("setup")}
            onContinue={() => setView("select")}
          />
        )}
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
            musicOn={musicOn}
            onToggleMusic={toggleMusic}
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
          <CollectionPage
            characters={baseCharacters}
            unlockedEndingIds={collection}
            onBack={() => setView("home")}
          />
        )}
      </div>
    </main>
  );
}
