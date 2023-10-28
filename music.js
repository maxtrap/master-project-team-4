let FT_BACKGROUND_MUSIC;

let currentMusic = null;

function musicPreload() {
    FT_BACKGROUND_MUSIC = loadSound('resources/love-shuttle.mp3');
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
    let music = getMusic();

    if (music === null) {
        return;
    }

    if (currentMusic !== music) {
        if (currentMusic !== null) {
            currentMusic.stop();
        }  

        currentMusic = music;
        // music.setVolume(0.5);
        music.loop();
    }
    
}