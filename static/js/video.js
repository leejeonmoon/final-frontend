document.addEventListener("DOMContentLoaded", function () {
    // 오늘 날짜를 최상단에서 선언하고 초기화합니다.
    const today = new Date();

    // 요소 선택
    const videoList = document.getElementById("video-list");
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModal = document.querySelector(".modal .close");
    const loadMoreButton = document.getElementById("load-more");
    const currentDateElement = document.getElementById("current-date");
    const selectDateBtn = document.getElementById("select-date-btn");
    const datePicker = document.getElementById("date-picker");

    let currentPage = 1;
    const videosPerPage = 6; // 한 번에 표시할 비디오 개수
    const videos = generateFakeVideos(); // 임시로 생성된 비디오 데이터

    // 오늘 날짜 표시
    if (currentDateElement) {
        currentDateElement.textContent = today.toISOString().split('T')[0];
    }
    datePicker.value = today.toISOString().split('T')[0]; // 날짜 선택기 기본값 설정

    // "Select Date" 버튼 클릭 시 날짜 선택기 표시
    selectDateBtn.addEventListener("click", function () {
        datePicker.style.display = "block";
        datePicker.focus(); // 날짜 선택기에 포커스
    });

    // 날짜 선택 시 해당 날짜의 비디오 목록 로드
    datePicker.addEventListener("change", function () {
        datePicker.style.display = "none"; // 날짜 선택 후 숨기기
        loadVideosForDate(this.value);
    });

    // 선택된 날짜에 해당하는 비디오 목록 로드
    function loadVideosForDate(date) {
        videoList.innerHTML = ""; // 기존 영상 목록 초기화
        const filteredVideos = videos.filter(video => video.date === date);
        renderVideos(filteredVideos.slice(0, videosPerPage)); // 첫 페이지 비디오 로드
        currentPage = 1;
        loadMoreButton.style.display = "block";
    }

    // 비디오 썸네일 생성 및 모달 연결
    function renderVideos(videosToShow) {
        videosToShow.forEach(video => {
            const videoThumbnail = document.createElement("div");
            videoThumbnail.classList.add("video-thumbnail");
            videoThumbnail.setAttribute("data-video-url", video.url);
            videoThumbnail.setAttribute("data-video-id", video.id); // 비디오 ID 속성 추가
            videoThumbnail.innerHTML = `<img src="${video.thumbnail}" alt="video thumbnail"><p>${video.title}</p>`;
            videoThumbnail.addEventListener("click", function () {
                modalVideo.querySelector("source").src = video.url;
                modalVideo.load();
                videoModal.style.display = "flex";
            });
            videoList.appendChild(videoThumbnail);
        });
    }

    // "더보기" 기능
    loadMoreButton.addEventListener("click", function () {
        currentPage++;
        const date = datePicker.value;
        const filteredVideos = videos.filter(video => video.date === date);
        const moreVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);
        renderVideos(moreVideos);

        if (currentPage * videosPerPage >= filteredVideos.length) {
            loadMoreButton.style.display = "none"; // 더 이상 불러올 영상이 없으면 버튼 숨김
        }
    });

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

    // 임시 데이터 생성
    function generateFakeVideos() {
        const fakeVideos = [];
        for (let i = 1; i <= 100; i++) {
            const date = new Date();
            date.setDate(today.getDate() - Math.floor(i / 6)); // 6개 비디오마다 하루씩 넘김
            fakeVideos.push({
                id: i, // 비디오 ID 추가
                url: `video${i}.mp4`,
                thumbnail: `thumbnail${i}.jpg`,
                title: `Event ${i}`,
                date: date.toISOString().split('T')[0]
            });
        }
        return fakeVideos;
    }

    // 초기 로드 (오늘 날짜)
    loadVideosForDate(today.toISOString().split('T')[0]);

    // videoList에 이벤트 리스너 추가
    videoList.addEventListener("click", function (event) {
        const target = event.target.closest(".video-thumbnail");
        if (target) {
            const videoId = target.getAttribute("data-video-id");
            fetchVideoFromServer(videoId);
        }
    });

    function fetchVideoFromServer(videoId) {
        fetch(`/get-video/${videoId}`) // 서버에 비디오 ID로 요청
            .then(response => {
                // JSON 응답이 아닐 경우 예외 처리
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // JSON 응답으로 변환
            })
            .then(data => {
                if (data.success) {
                    const videoUrl = data.videoUrl; // 서버에서 받은 비디오 URL
                    openModalWithVideo(videoUrl);
                } else {
                    console.error("Failed to load video:", data.message);
                }
            })
            .catch(error => console.error('Error:', error)); // 오류 처리
    }
    

    function openModalWithVideo(videoUrl) {
        modalVideo.querySelector("source").src = videoUrl;
        modalVideo.load();
        videoModal.style.display = "flex";
    }
});
