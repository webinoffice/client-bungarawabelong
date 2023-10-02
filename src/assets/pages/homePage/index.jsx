import * as React from 'react';
import css from './homePage.module.css';
import HomeCarousel from '../../components/homeCarousel';
import HomeMenu from '../../components/homeMenu';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';
import { Map, Wrapper, Status } from "@googlemaps/react-wrapper";
import { Typography } from '@mui/material';

const step = 0;

// let map;

// async function initMap() {
//   // The location of Uluru
//   const position = { lat: -25.344, lng: 131.031 };
//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//   map = new Map(document.getElementById("map"), {
//     zoom: 4,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // The marker, positioned at Uluru
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
// }

function HomePage() {
    return (
        <div className={css.topPallete}>
            <SearchAppBar/>
            <HomeCarousel/>
            <HomeMenu/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Lokasi Kami
            </Typography>
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe 
                        class="gmap_iframe" 
                        width="100%"
                        style={{aspectRatio:'1/1', pointerEvents:'none'}}
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Pasar Bunga Rawa Belong Jl. Sulaiman No.56, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11540&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed
">
                    </iframe>
                </div>
                {/* <style>
                    .mapouter{position:relative;text-align:right;width:100%;height:400px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:400px;}.gmap_iframe {height:400px!important;}
                </style> */}
            </div>
            <div style={{height: '50px'}}></div>
            <NavigationBar para={step}/>
        </div>
    );
}

export default HomePage;