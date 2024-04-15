'use client'
import React from "react";
import style from './nav.module.css';
import Image from "next/image";

export default function NavBar() {
    return (
        <nav className={`${style.navBar}`}>
            <div className={`${style.logoContainer}`}>
                <Image width={80} height={70} src="/logo/logo-header1.png" alt="logo-Yerba-Buena" />
            </div>
            <div className={`${style.titlediv}`}>
                <h2 className={`${style.title}`}>Control de Stock</h2>
            </div>
        </nav>
    );
}
