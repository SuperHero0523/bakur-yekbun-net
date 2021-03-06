export default {
  mounted() {
    $(document).on("click", ".show-more, footer.mobile > .left", function() {
      $("footer").toggleClass("expanded");
    });

    // Up Next Queue
    var tracklist = [
      {
        song: "Not Backing Down (Feat. Tedashii)",
        artist: "Blanca",
        artwork: "images/61vssQMZ6BL._SS500.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/09%20Not%20Backing%20Down%20(feat.%20Tedashii).mp3",
        length: "3:24",
        star: "4",
        price: ""
      },
      {
        song: "'Till The Day I Die (Feat. NF)",
        artist: "TobyMac",
        artwork:
          "https://images-na.ssl-images-amazon.com/images/I/410s4dhNkeL._SS500.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/05%20Til%20the%20Day%20I%20Die%20(feat.%20NF).mp3",
        length: "3:47",
        star: "5",
        price: ""
      },
      {
        song: "Love With Your Life",
        artist: "Hollyn",
        artwork: "https://i.ytimg.com/vi/-ydrXLttwL0/maxresdefault.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/01%20Love%20With%20Your%20Life.mp3",
        length: "3:32",
        star: "5",
        price: ""
      },
      {
        song: "You'll Never Be Alone",
        artist: "Capital Kings",
        artwork:
          "https://images-na.ssl-images-amazon.com/images/I/517vt2E1V7L.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/03%20You'll%20Never%20Be%20Alone.mp3",
        length: "3:28",
        star: "4",
        price: ""
      },
      {
        song: "Undefeated",
        artist: "Tauren Wells",
        artwork:
          "https://c3.cduniverse.ws/resized/250x500/music/435/10341435.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/02%20Undefeated%20(feat.%20KB).mp3",
        length: "4:04",
        star: "3",
        price: ""
      },
      {
        song: "Brother (Feat. David DeGraw)",
        artist: "NEEDTOBREATHE",
        artwork:
          "https://images-na.ssl-images-amazon.com/images/I/51mIXCZSoVL._SS500.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/NEEDTOBREATHE-Brother.mp3",
        length: "4:09",
        star: "5",
        price: ""
      },
      {
        song: "Prove It (Feat. KB)",
        artist: "Crowder",
        artwork:
          "https://images-na.ssl-images-amazon.com/images/I/61eHMx58yiL._SL500_AA130_.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/05%20Prove%20It%20(feat.%20K.B.).mp3",
        length: "2:36",
        star: "4",
        price: ""
      },
      {
        song: "Get Hype",
        artist: "1GN",
        artwork:
          "https://s.mxmcdn.net/images-storage/albums4/3/1/3/3/1/2/33213313_350_350.jpg",
        source:
          "https://koenigsegg1.000webhostapp.com/codepen/01%20Get%20Hype.mp3",
        length: "3:19",
        star: "1",
        price: ""
      }
    ];

    // Fetch Data From JSON
    for (var i = 0; i < tracklist.length; ++i) {
      $("footer .tracks").append(
        "<div class='up-next flex' data-tracklistNumber='" +
          i +
          "'><div class='left flex align-center'><img src='" +
          tracklist[i].artwork +
          "'/><div class='info' style='background-color: inherit'><p>" +
          tracklist[i].song +
          "</p><p>" +
          tracklist[i].artist +
          "</p></div></div><div class='right flex align-center'><div class='length'>" +
          tracklist[i].length +
          "</div><i style='color:rgba(11, 11, 11, 0.25);margin-left: 40px;font-size: 20px;' class='fa fa-share-alt'></i>" +
          "<i style='color:rgba(11, 11, 11, 0.25);margin-left: 50px;font-size: 20px;' class='fa fa-trash'></i>" +
          "<i style='color: rgba(11, 11, 11, 0.25);margin-left: 40px;font-size: 20px;' class='fa fa-exchange'></i>" +
          "</div></div>"
      );
    }

    // Detect IE/Edge
    function detectIE() {
      var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE "),
        trident = ua.indexOf("Trident/"),
        edge = ua.indexOf("Edge/");

      if (msie > 0 || trident > 0 || edge > 0) {
        $("body").addClass("ie");
      }
    }

    detectIE();

    // Audio Player
    function audioPlayer() {
      var $audio = $("#audio"),
        audio = document.getElementById("audio"),
        $time = $("#time"),
        $volume = $("#volume"),
        volume = $volume.val(),
        $play = $(".play"),
        playlistLength = tracklist.length,
        i = 0,
        volumeBefore;

      $time.on("mousedown", function() {
        audio.pause();
      });

      $time.on("mouseup", function() {
        audio.play();
      });

      // Check If Audio Is Plaing
      function isPlaying() {
        return !audio.paused;
      }

      // Change Play Button On Play/Pause
      function playPauseButton() {
        if (isPlaying()) {
          $play.addClass("paused");
        } else {
          $play.removeClass("paused");
        }
      }

      // Play/Pause Audio
      function playPause() {
        if (isPlaying()) {
          audio.pause();
        } else {
          audio.play();
        }
      }

      // Change Play Button When Paused Or Played
      $audio.on("play playing pause", function() {
        playPauseButton();
      });

      // Find Duration
      $audio.on("canplay", function() {
        var d = this.duration;

        // Set The Input Slider Max Value
        $time.attr("max", d);
      });

      // Find Current Position
      $audio.on("timeupdate", function() {
        var n = this.currentTime,
          d = this.duration,
          gradient = (n / d) * 100;

        // Change Input Slider When Playing
        $time.val(n);
        $time.attr("value", n);

        // Change Input Slider Background When Playing
        $time.css("background", "");

        // Preload next song
        if (n >= d - 30 && i != playlistLength - 1) {
          $(".n:empty").html(
            "<audio id='audio-next' preload='metadata' src='" +
              tracklist[i + 1].source +
              "'></audio>"
          );
        } else if (n < d - 30 && !$(".n").is(":empty")) {
          $(".audio-next").html("");
        } else {
          return;
        }
      });

      function songInfo() {
        audio.pause();
        audio.currentTime = 0;
        $time.css("background", "#E1E1E1");
        $time.val(0);
        $time.attr("value", 0);
        $audio.attr("src", tracklist[i].source);
        $("footer .artwork").attr("src", tracklist[i].artwork);
        $("footer .song").html(tracklist[i].song);
        $("footer .artist").html(tracklist[i].artist);
        $("footer > .right .price").html("$" + tracklist[i].price);
        $(".up-next").removeClass("active");
        $(".up-next:nth-child(" + (i + 1) + ")").addClass("active");
        playPauseButton();
      }

      songInfo();

      // Play next song when current track has ended
      $audio.on("ended", function() {
        // If Repeat One Is On
        if ($(".repeat").hasClass("repeat-one")) {
          audio.currentTime = 0;
          $time.css("background", "");
          $time.val(0);
          $time.attr("value", 0);
          audio.play();
          // If Its The Last Track And Repeat All Is On
        } else if (
          $(".repeat").hasClass("repeat-all") &&
          i == playlistLength - 1
        ) {
          i = 0;
          songInfo();
          audio.play();
          // If Its The Last Track
        } else if (i == tracklist.length - 1) {
          i = 0;
          songInfo();
          // Otherwise
        } else {
          i++;
          songInfo();
          audio.play();
        }
      });

      // Time slider
      $time.on("input", function() {
        var v = $(this).val(),
          d = audio.duration,
          durationGradient = (parseInt(v) / d) * 100;

        $(this).trigger("change");

        // Set current time to the value of the slider
        audio.currentTime = v;

        // Set the background of the slider
        $time.css("background", "");
      });

      function setVolume() {
        var gradient = volume * 100;

        // Set audio volume
        audio.volume = $volume.val();
        volume = $volume.val();

        // Set slider background
        $volume.css("background", "");
      }

      // Volume Input Slider
      $volume.on("input", function() {
        $(this).trigger("change");
        setVolume();

        // Trigger muted icon
        if (volume == 0) {
          $(".volume").addClass("muted");
        } else {
          $(".volume").removeClass("muted");
        }
      });

      // Volume Mute Button
      $(".volume").on("click", function() {
        $(this).toggleClass("muted");

        // Return to volume before muting
        if (volume == 0) {
          $volume.val(volumeBefore);
          audio.volume = volumeBefore;
          volume = volumeBefore;
          // Mute
        } else {
          volumeBefore = volume;
          $volume.val(0);
          audio.volume = 0;
          volume = 0;
        }

        setVolume();
      });

      // Play/Pause Button
      $play.on("click", function() {
        playPause();
      });

      // Play When Spacebar Is Pressed
      $(window).keypress(function(e) {
        // Only if an input field is not in focus
        if (e.keyCode === 0 || (e.keyCode === 32 && !$("input").is(":focus"))) {
          e.preventDefault();
          playPause();
        }
      });

      // Repeat Button
      $(".repeat").on("click", function() {
        if ($(this).hasClass("repeat-one")) {
          $(this).removeClass("repeat-one");
          $(this).addClass("repeat-all");
        } else if ($(this).hasClass("repeat-all")) {
          $(this).removeClass("repeat-all");
        } else {
          $(this).addClass("repeat-one");
        }
      });

      // Previous Button
      $(".previous")
        .unbind()
        .click(function() {
          if (audio.currentTime < 5 && i == 0) {
            audio.currentTime = 0;
          } else if (audio.currentTime < 5) {
            i = i - 1;
            songInfo();
            audio.play();
          } else {
            audio.currentTime = 0;
          }
        });

      // Next Button
      $(".next").on("click", function() {
        // If it is the last song and repeat one is on
        if (i == tracklist.length - 1 && $(".repeat").hasClass("repeat-one")) {
          i = 0;
          songInfo();
          $(".repeat").removeClass("repeat-one");
          // If it is the last song and repeat all is on
        } else if (
          i == tracklist.length - 1 &&
          $(".repeat").hasClass("repeat-all")
        ) {
          i = 0;
          songInfo();
          audio.play();
          // If repeat one is on
        } else if ($(".repeat").hasClass("repeat-one")) {
          i++;
          songInfo();
          audio.play();
          // If it is the last song
        } else if (i == tracklist.length - 1) {
          i = 0;
          songInfo();
        } else {
          $audio.trigger("ended");
        }
      });

      // Play When Clicked
      $(".up-next").on("click", function() {
        i = $(this).data("tracklistnumber");
        songInfo();
        audio.play();
      });
    } // End Audio Player Function

    audioPlayer();

    // Mobile view
    function mobileFooter() {
      if ($(window).width() < 600) {
        $("footer").addClass("mobile");
      } else {
        $("footer").removeClass("mobile");
      }
    }

    mobileFooter();

    $(window).resize(function() {
      mobileFooter();
    });
  }
};
