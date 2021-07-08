const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'DUONG_PLAYER';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const progress = $('#progress');
const player = $('.player');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [

        {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        },
        {
            name: 'Blame You ( Remix ) - Lopu$',
            single: 'Lucien B',
            path: './assets/music/blameyouremix.mp3',
            image: './assets/img/lucien.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        }, {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        }, {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        }, {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        }, {
            name: 'Đường Tôi Chở Em Về (Cukak Remix)',
            single: 'BUITRUONGLINH',
            path: './assets/music/Duong-Toi-Cho-Em-Ve-Cukak-Remix-Buitruonglinh.mp3',
            image: './assets/img/Cukak.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `            

        <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}">
    <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
    <h3 class="title">${song.name}</h3>
    <p class="author">${song.single}<p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
        `;
        });
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });

    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });

        }, 300);
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth;
        const _this = this;
        //Xử lý CD quay dừng
        const cdThumbAnimate = cdThumb.animate({
            transform: 'rotate(360deg)'
        }, {
            duration: 10000, // 10 seconds
            iterations: Infinity // lặp vô hạn
        });
        cdThumbAnimate.pause()
            // Xử lý khi click play
        playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause();

                } else {
                    audio.play();

                }

            }
            // khi song được play
        audio.onplay = function() {
                player.classList.add('playing');
                _this.isPlaying = true;
                cdThumbAnimate.play();
            }
            // khi song được pause      
        audio.onpause = function() {
                player.classList.remove('playing');
                _this.isPlaying = false;
                cdThumbAnimate.pause();

            }
            // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent;
                }

                progress.oninput = function(e) {
                    const seekTime = e.target.value * audio.duration / 100;
                    audio.currentTime = seekTime;
                }
            }
            //Xử lý khi phóng to thu nhỏ CD   
        document.onscroll = function() {
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const newCDWidth = cdWidth - scrollTop;
                console.log(newCDWidth)
                cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0;
                cd.style.opacity = newCDWidth / cdWidth;
            },
            // bấm next bài hát
            nextBtn.onclick = function() {

                if (_this.isRandom) {
                    _this.playRandomSong();

                } else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            },
            // bấm prev bài hát
            prevBtn.onclick = function() {

                if (_this.isRandom) {
                    _this.playRandomSong();

                } else {
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            },
            // xử lý song khi audio end : auto next song while not click repeat 
            audio.onended = function() {
                if (_this.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }

            },
            // xử lý bật tắt random
            randomBtn.onclick = function(e) {
                _this.isRandom = !_this.isRandom;
                randomBtn.classList.toggle('active', _this.isRandom);
                _this.setConfig('isRandom', _this.isRandom);
            },
            // xử lý lặp lại 1 song
            repeatBtn.onclick = function() {
                _this.isRepeat = !_this.isRepeat;
                repeatBtn.classList.toggle('active', _this.isRepeat);
                _this.setConfig('isRepeat', _this.isRepeat);
            },
            // lắng nghe hành vi click vào playlist
            playlist.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)');

                if (songNode || e.target.closest('.option')) {
                    // xử lý khi click vào song
                    if (songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        audio.play();
                        _this.render()
                    }
                    // xử lý khi click vào song-option
                    if (e.target.closest('.option')) {

                    }
                    console.log(e.target)
                }

            }

    },

    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // next bài hát
    nextSong: function() {
        this.currentIndex++;
        console.log(this.currentIndex, this.songs.length);
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        console.log(this.currentIndex, this.songs.length);
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    start: function() {
        // gán cấu hình từ config vào app
        this.loadConfig();
        // định nghĩa các thuộc tính cho object
        this.defineProperties();
        // Lắng nghe và xử sự kiện trong Object
        this.handleEvents();
        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // render playlist
        this.render();
        // hiện thị trạng thái ban đầu của repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }

}
app.start()