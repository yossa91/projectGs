
/*모바일 사이드메뉴 스크립트 */
var subMenuBtn = document.querySelector('.mMainHeaderMenu');
var subMenuHei = document.querySelector('.mSideMenu');
var subListBtn = document.querySelectorAll('.mSideMenuSubT');
var subList = document.querySelectorAll('.mSideMenuSub');

subMenuBtn.addEventListener('click', ()=> {
    if(subMenuHei.clientHeight == 0){
        subMenuHei.style.height = 'calc(100vh - 66px)';
        subMenuBtn.style.background = "url('../img/bugerMenu_close.png')right 15px center no-repeat";
        subMenuBtn.style.backgroundSize = "20px auto";
    }else{
        subMenuHei.style.height = 0;
        subMenuBtn.style.background = "url('../img/bugerMenu.png')right 15px center no-repeat";
        subMenuBtn.style.backgroundSize = "20px auto";
    }
});

subListBtn.forEach((el, idx) => {
    subListBtn[idx].addEventListener('click', () => {
        for(var i = 0; subList.length > i ; i++ ){
            subList[i].style.height = 0;
        }
        subList[idx].style.height =  subList[idx].scrollHeight + 'px';
    });
});
/*웹 메뉴*/
var menuBtn = document.querySelectorAll('.h_m_menuBtn');
var menuList = document.querySelectorAll('.h_m_slideMenu');
    menuBtn.forEach((el, idx) => {
        menuBtn[idx].addEventListener('mouseover', () => {
            //태블릿부터는 슬라이드 메뉴 제거
            if(document.body.clientWidth < 960){
                for(var i = 0; menuList.length > i ; i++ ){
                    menuList[i].style.display = 'none';
                }
                menuList[idx].style.display =  'none';
            }else{
                for(var i = 0; menuList.length > i ; i++ ){
                    menuList[i].style.display = 'none';
                    menuBtn[i].style.color = '#333';
                }
                menuList[idx].style.display =  'block';
                menuBtn[idx].style.color = '#659E35';
            }
        });
    });
    menuList.forEach((el, idx) => {
        menuList[idx].addEventListener('mouseleave', () => {
            menuList[idx].style.display =  'none';
            menuBtn[idx].style.color = '#333';
        });
    });

    /*메인 모바일 시 지도 뜨면서 footer 사라지게 */
    var mainMap =  document.querySelector('#mapMain');
    var foo = document.querySelector('footer');

    window.addEventListener('resize', () => {
        if(mainMap.clientHeight > 100){ 
            foo.style.display = 'none';
        }else{
            foo.style.display = 'block';
        }
    });






var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
mapOption = { 
    center: new kakao.maps.LatLng(35.686632, 127.909469), // 지도의 중심좌표
    level: 5 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();
// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
//var zoomControl = new kakao.maps.ZoomControl();
//map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);



// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
var positions = [
{
    content: `<div class="iBox">
                <h4>청소년 수련원</h4>
                <p>대여 가능한 자전거 : <span class="iBoxPoint">5대</span></p>
                <p>반납 가능한 보관대 : <span>3대</span></p>
            </div>`, 
    latlng: new kakao.maps.LatLng(35.692760, 127.906312)
},
{
    content: `<div class="iBox">
                <h4>화목아파트</h4>
                <p>대여 가능한 자전거 : <span class="iBoxPoint">3대</span></p>
                <p>반납 가능한 보관대 : <span>8대</span></p>
            </div>`,  
    latlng: new kakao.maps.LatLng(35.692682, 127.914914)
},
{
    content: `<div class="iBox">
                <h4>상림리 책읽는 공원</h4>
                <p>대여 가능한 자전거 : <span class="iBoxPoint">2대</span></p>
                <p>반납 가능한 보관대 : <span>9대</span></p>
            </div>`,  
    latlng: new kakao.maps.LatLng(35.688695, 127.902901)
},
{
    content: `<div class="iBox">
                <h4>거창군청</h4>
                <p>대여 가능한 자전거 : <span class="iBoxPoint">4대</span></p>
                <p>반납 가능한 보관대 : <span>6대</span></p>
            </div>`,  
    latlng: new kakao.maps.LatLng(35.686747, 127.909544)
}


];


var imageSrc = './img/test1.png', // 마커이미지의 주소입니다    
imageSize = new kakao.maps.Size(30, 35) // 마커이미지의 크기입니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

for (var i = 0; i < positions.length; i ++) {
// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[i].latlng, // 마커의 위치
    image: markerImage
});

// 마커에 표시할 인포윈도우를 생성합니다 
var infowindow = new kakao.maps.InfoWindow({
    content: positions[i].content // 인포윈도우에 표시할 내용
});

// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
// 이벤트 리스너로는 클로저를 만들어 등록합니다 
// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow, ));
kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
return function() {
    infowindow.open(map, marker);
};
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
return function() {
    infowindow.close();
};
}