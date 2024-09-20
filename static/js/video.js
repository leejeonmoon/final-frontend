document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const videoList = document.getElementById("video-list");
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModal = document.querySelector(".modal .close");
    const currentDateElement = document.getElementById("current-date");
    const datePicker = document.getElementById("date-picker");
    const selectDateBtn = document.getElementById("select-date-btn");

    const videosPerInterval = 6;
    const videos = generateFakeVideos(); // 임시로 생성된 비디오 데이터

    // 오늘 날짜 표시
    if (currentDateElement) {
        currentDateElement.textContent = today.toISOString().split('T')[0];
    }

    // Flatpickr 초기화
    flatpickr(datePicker, {
    defaultDate: today,
    dateFormat: "Y-m-d",
    maxDate: today,
    appendTo: selectDateBtn.parentNode, // 달력 팝업을 select-date-btn의 부모 요소에 추가
    onChange: function(selectedDates, dateStr) {
        const selectedDate = new Date(dateStr);
        if (selectedDate > today) {
            displayNoVideoMessage(); // 오늘 이후의 날짜 선택 시 "No Video" 메시지 표시
        } else {
            selectDateBtn.textContent = dateStr; // 선택된 날짜로 버튼 텍스트 변경
            loadVideosForDate(dateStr);
        }
    }
});


    // "Select Date" 버튼 클릭 시 Flatpickr 표시
    selectDateBtn.addEventListener("click", function () {
        datePicker._flatpickr.open(); // Flatpickr를 열기
    });

    // 비디오 로드 함수
    function loadVideosForDate(date) {
        videoList.innerHTML = ""; // 기존 영상 목록 초기화
        const filteredVideos = videos.filter(video => video.date === date);
        if (filteredVideos.length === 0) {
            displayNoVideoMessage(); // 해당 날짜에 비디오가 없으면 "No Video" 메시지 표시
        } else {
            renderVideos(filteredVideos.slice(0, videosPerInterval)); // 첫 6개의 비디오만 표시
        }
    }

    // 비디오 썸네일 생성 및 모달 연결 (4시간 간격, 6개 비디오 표시)
    function renderVideos(videosToShow) {
        videoList.innerHTML = ''; // 기존의 썸네일 초기화
        videosToShow.forEach((video, index) => {
            const videoThumbnail = document.createElement("div");
            videoThumbnail.classList.add("video-thumbnail");
            videoThumbnail.setAttribute("data-video-url", video.url);
            videoThumbnail.innerHTML = `<img src="${video.thumbnail}" alt="video thumbnail"><p>Event ${index + 1}</p>`; // 이벤트 번호 1부터 시작
            videoThumbnail.addEventListener("click", function () {
                modalVideo.querySelector("source").src = video.url;
                modalVideo.load();
                videoModal.style.display = "flex";
            });
            videoList.appendChild(videoThumbnail);
        });
    }

    // 비디오 모달 닫기 처리
    closeModal.addEventListener("click", function () {
        videoModal.style.display = "none";
        modalVideo.pause();
    });

    window.addEventListener("click", function (event) {
        if (event.target == videoModal) {
            videoModal.style.display = "none";
            modalVideo.pause();
        }
    });

    // "No Video" 메시지 표시
    function displayNoVideoMessage() {
        videoList.innerHTML = ""; // 기존 영상 목록 초기화
        const noVideoMessage = document.createElement("div");
        noVideoMessage.classList.add("no-video-message");
        noVideoMessage.textContent = "No Video";
        videoList.appendChild(noVideoMessage);
    }

    // 임시 데이터 생성 (2주 동안 매일 6개씩의 비디오)
    function generateFakeVideos() {
        const fakeVideos = [];
        for (let dayOffset = 0; dayOffset < 14; dayOffset++) { // 2주 동안
            const date = new Date(today);
            date.setDate(today.getDate() - dayOffset);
            for (let i = 1; i <= 6; i++) { // 매일 6개 비디오
                fakeVideos.push({
                    id: i, // 비디오 ID 추가
                    url: `video${i + dayOffset * 6}.mp4`,
                    thumbnail: `thumbnail${i + dayOffset * 6}.jpg`,
                    title: `Event ${i}`, // 이벤트 번호 1부터 시작
                    date: date.toISOString().split('T')[0]
                });
            }
        }
        return fakeVideos;
    }

    // 초기 로드 (오늘 날짜)
    loadVideosForDate(today.toISOString().split('T')[0]);
});
