import { useRouter } from 'next/navigation';
import Script from 'next/script'
import React, { useState } from 'react'

function viewMaps() {

    const router = useRouter();
    const [distance, setDistance] = useState(0.0);

    let map;
    let suggest;

    const initMap = () => {

        suggest = document.getElementById('suggest');

        map = new longdo.Map({
            placeholder: document.getElementById('map')
        });
    
        map.Ui.Crosshair.visible(false);
        map.Ui.Scale.visible(false);
        map.Search.enablePopup(false);

        map.location(longdo.LocationMode.Geolocation);
    
        map.zoomRange({min: 6, max: 16})
        map.zoom(16, true)
            
        map.Search.placeholder(
            document.getElementById('result')
        );

        search.oninput = function() {
            if (search.value.length < 3) {
                suggest.style.display = 'none';
                return;
            }
            
            map.Search.suggest(search.value, {});
        };

        map.Event.bind('suggest', function(result) {
            if (result.meta.keyword != search.value) return;
            
            suggest.innerHTML = '';

            for (var i = 0, item; item = result.data[i]; ++i) {
                longdo.Util.append(suggest, 'li', {
                    innerHTML: item.w
                });
            }

            suggest.style.display = 'flex';
        });

        map.Event.bind('geolocation', (e) => {

            if (!e) return

            let userLat = e.coords.latitude
            let userLon = e.coords.longitude

            let userMarker = new longdo.Marker({lat: userLat, lon:userLon}, {title: "userLocated", icon: {}})

            map.Event.bind('search', (e) => {

                if (!e.data[0]) return

                let pointLat = e.data[0].lat
                let pointLon = e.data[0].lon

                let pointMarker = new longdo.Marker({lat: pointLat, lon:pointLon}, {title: "userLocated"})

                map.location({lat:pointLat , lon:pointLon});

                map.Route.add(userMarker)
                map.Route.add(pointMarker)

                map.Route.search()

                map.Event.bind('guideComplete', (e) => {
                    setDistance((map.Route.distance()) / 1000);
                })

            })

        })
    }

    const doSearch = () => {
        map.Search.search(search.value, {
          limit: 1
        });

        suggest.style.display = 'none';
    }

    const doSuggest = (value) => {
        search.value = value;

        doSearch();
    }

    const handleChange = () => {

        if (!map.Route) return

        map.Route.clear()
    }

    const handleSubmit = () => {
        router.push(`/calculator?distance=${distance}`);
    }

    return (
        <main className='w-full h-full' >

            <Script onReady={initMap} strategy='afterInteractive' type='text/javascript' src='https://api.longdo.com/map/?key=04998229cfe9ec6d83f44173c34daff3' />

            <div id='map' className='w-full h-full'></div>

            <form id='searchPlace' onSubmit={doSearch} className="w-full h-auto flex flex-col justify-center items-center absolute bottom-24">
                <input id='search' onChange={handleChange} className="peer px-4 py-2 rounded-full border-b-4 border-[#E2B274] bg-[#F7DCB9]" type="text" placeholder='สถานที่ที่คุณจะไป...' autoComplete='off' />
                <ul id='suggest' onClick={(e) => {doSuggest(e.target.innerText)}} className="w-56 max-h-24 h-auto top-11 px-4 overflow-auto absolute hidden flex-col border-b-2 border-slate-400 bg-white"></ul>
                <button onClick={handleSubmit} type='button' className='mt-6 text-2xl text-white px-8 py-2 rounded-full border-b-4 border-[#717c4d] bg-[#B5C18E]' >คำนวณคาร์บอน</button>
            </form>

        </main>
    )
}

export default viewMaps