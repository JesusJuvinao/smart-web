/* eslint-disable camelcase */
/* eslint-disable no-console */
import Head from 'next/head'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export default function Autho () {
    const onSuccess = googleUser => {
        console.log('Sessión iniciada')
        const userData = googleUser.getBasicProfile()
        console.log('ID', userData.getId())
        console.log('email', userData.getEmail())
        console.log('name', userData.getName())
        console.log('family name', userData.getFamilyName())
        console.log('Given name', userData.getGivenName())
        console.log('img url', userData.getImageUrl())
    }

    const onFailure = () => {
        alert('No ha sido posible iniciar sesión con google.')
    }

    useEffect(() => {
        console.log('Loading...')
        if (window.gapi) {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: '767946516609-c7c931djmkgcshqf540rr1qqoluk8639.apps.googleusercontent.com'
                })
                console.log('Api inited')
                window.gapi.load('signin2', () => {
                    window.gapi.signin2.render('loginButton', {
                        scope: 'profile email',
                        width: 240,
                        height: 50,
                        longtitle: true,
                        theme: 'dark',
                        onsuccess: onSuccess,
                        onfailure: onFailure
                    })
                })
            })
        }
    }, [window])
    // function test_signIn () {
    //   gapi.auth2.getAuthInstance().signIn({
    //     scope: 'email profile',
    //     prompt: 'content',
    //     login_hint: 'example@example.com',
    //     fetch_basic_profile: true
    //   })
    // }
    return <>
        <Head>
            <script src="https://apis.google.com/js/platform.js" async defer />
        </Head>
        <Container>
            <div id='loginButton'></div>
        </Container>
    </>
}
const Container = styled.div`
    & > #loginButton {
        width: 50% !important;
    }
    & > .abcRioButtonContentWrapper {
        
        width: 50% !important;
    }
    .abcRioButtonContentWrapper {
        width: 50% !important;
        
    }
    .abcRioButtonBlue .abcRioButtonContentWrapper {
        width: 50% !important;
        
    }
    .abcRioButtonBlue .abcRioButtonIcon {
        width: 50% !important;
    }
`
