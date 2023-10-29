let FT_BACKGROUND_MUSIC;

let currentMusic = null;

function musicPreload() {
    FT_BACKGROUND_MUSIC = loadSound('resources/love-shuttle.mp3');
}

//Sets music volume corresponding to the current scene
function setVolume() {
    if (currentScene instanceof FairytaleTapper) {
        FT_BACKGROUND_MUSIC.setVolume(0.5);
    } else if (currentScene instanceof FairytaleEndScreen) {
        FT_BACKGROUND_MUSIC.setVolume(0.2)
    }
}

//Returns music corresponding to the current scene.
function getMusic() {
    if (currentScene instanceof FairytaleTapper || currentScene instanceof FairytaleEndScreen) {
        return FT_BACKGROUND_MUSIC;
    }
    return null;
}

//Plays music based on the current scene. If the corresponding song is already playing, it does nothing.
function playMusic() {
    setVolume();
    let music = getMusic();

    if (music === null) {
        if (currentMusic) {
            currentMusic.stop();
            currentMusic = null;
        }
        return;
    }

    if (currentMusic !== music) {
        if (currentMusic !== null) {
            currentMusic.stop();
        }  

        currentMusic = music;
        music.loop();
    }
    
}