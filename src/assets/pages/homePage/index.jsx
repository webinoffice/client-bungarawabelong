import * as React from 'react';
import css from './homePage.module.css';
import HomeCarousel from '../../components/homeCarousel';
import HomeMenu from '../../components/homeMenu';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';

const step = 0;

function HomePage() {
    return (
        <div className={css.topPallete}>
            <SearchAppBar/>
            <HomeCarousel/>
            <HomeMenu/>
            <NavigationBar para={step}/>
        </div>
    );
}

export default HomePage;