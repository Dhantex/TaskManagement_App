import React, { ReactNode } from 'react'
import {NavBar} from '../NavBar/NavBar'
import {Footer} from '../Footer/Footer'

interface LayoutProps {
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    return(
        <React.Fragment>
            <NavBar />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}