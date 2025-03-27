window.addEventListener('load', () => {
    const song = document.querySelector('.song');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
        // For iOS Safari, show a direct play button
        const playMusicButton = document.createElement('button');
        playMusicButton.textContent = 'Play Background Music';
        playMusicButton.style.position = 'fixed'; // Adjust styling as needed
        playMusicButton.style.bottom = '20px';
        playMusicButton.style.left = '50%';
        playMusicButton.style.transform = 'translateX(-50%)';
        playMusicButton.style.padding = '10px 20px';
        document.body.appendChild(playMusicButton);

        playMusicButton.addEventListener('click', () => {
            if (song) {
                song.play()
                    .then(() => {
                        console.log('Audio started successfully (iOS Safari button)');
                        playMusicButton.style.display = 'none'; // Hide button after first play
                        animationTimeline(); // Call your animation function
                    })
                    .catch((err) => {
                        console.warn('iOS Safari button playback failed:', err);
                    });
            }
        });
        // Don't show the SweetAlert on iOS Safari
    } else {
        // For other browsers, show the SweetAlert
        Swal.fire({
            title: 'Do you want to play music in the background?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false,
            didOpen: () => {
                const confirmBtn = Swal.getConfirmButton();
                confirmBtn.addEventListener('click', () => {
                    if (song) {
                        song.play()
                            .then(() => {
                                console.log('Audio started successfully (non-iOS Safari didOpen)');
                            })
                            .catch((err) => {
                                console.warn('Non-iOS Safari playback failed in didOpen:', err);
                            });
                    }
                });
            }
        }).then((result) => {
            if (result.isConfirmed && song) {
                song.play()
                    .then(() => {
                        console.log('Audio started successfully (non-iOS Safari then)');
                    })
                    .catch((err) => {
                        console.warn('Primary play failed in then:', err);
                    });
            }
            animationTimeline();
        });
    }
});

// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];
    
    // Initially hide the video element
    const videoElement = document.getElementById("background-video");
    if (videoElement) {
        videoElement.parentElement.style.display = "none";
    }

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 1.0, {  // Increased duration from 0.7 to 1.0
        opacity: 0,
        y: 10
    })
    .from(".two", 2, {  // Increased duration from 0.7 to 1.0
        opacity: 0,
        y: 10
    })
    .to(".one",
        1.0, {  // Increased duration from 0.7 to 1.0
            opacity: 0,
            y: 10
        },
    "+=3")
    .to(".two",
        1, {  // Increased duration from 0.7 to 1.0
            opacity: 0,
            y: 10
        },
    "-=1.5")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=2")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.05
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=0.5")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=3")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=3")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=2"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    // Show the video section and play the video
    .call(function() {
        // Show the video container
        document.querySelector('.seven').style.display = "block";
        // Reset the video to ensure it starts from the beginning
        videoElement.currentTime = 0;
        // Play the video
        videoElement.play();
    })
    // Pause the timeline until video ends
    .addPause("+=0.5")
    .from(
        ".profile-picture",
        0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.8,
            y: 1400,
            zIndex: "0",
        }, {
            opacity: 1,
            y: -1000,
            zIndex: "0",
        },
        0.5
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );

    // Add event listener to the video to resume animation when it ends
    if (videoElement) {
        videoElement.addEventListener('ended', function() {
            // Show the picture
            document.querySelector('.six').style.display = "block";
            // Resume the timeline animation
            tl.play();
        });
    }

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}


