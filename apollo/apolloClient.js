/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_BASE } from './urls'

export const isProduct = makeVar([])

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
let apolloClient

// const refreshAuthToken = async (token, refreshToken) => {
//     const authState = decode(token)
//     const newToken = await fetchJson(`${ URL_BASE }graphql`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             query: `mutation {
//          refreshUserToken(userId: "${ authState?.id }", refreshToken: "${ refreshToken }" ) {
//            userId
//            token
//            newRefreshToken
//          }
//        }`
//         })
//     }).then(res => {
//         if (res) {
//             if (typeof res?.data?.refreshUserToken?.userId !== 'undefined') {
//                 localStorage.setItem('userId', res?.data?.refreshUserToken?.userId)
//             }
//             if (typeof res?.data?.refreshUserToken?.token !== 'undefined') {
//                 localStorage.setItem('sma.sv1', res?.data?.refreshUserToken?.token)
//             }
//             if (typeof res?.data?.refreshUserToken?.newRefreshToken !== 'undefined') {
//                 localStorage.setItem('refreshToken', res?.data?.refreshUserToken?.newRefreshToken)
//             }
//         }
//         const newAccessToken = res?.data?.refreshUserToken?.token && res?.data?.refreshUserToken?.token
//         return newAccessToken
//     })
//     return newToken
// }

// const refreshAuthToken = async (token, refreshCode) => {
//   const authState = decode(token)
//   const newToken = await apolloClient
//     .mutate({
//       mutation: gql`
//          mutation refreshUserToken($userId: ID!, $refreshToken: String!) {
//            refreshUserToken(userId: $userId, refreshToken: $refreshToken ) {
//              userId
//              token
//              newRefreshToken
//            }
//          }
//        `,
//       variables: { userId: authState?.id, refreshToken: refreshCode }
//     })
//     .then(res => {
//       return res
//       // const newAccessToken = res.data?.refreshAccessToken?.accessToken;
//       // setStorageData(STORAGE_CONTANTS.AUTHTOKEN, newAccessToken, true);
//       // return newAccessToken;
//     })
//   return newToken
// }
// const authLink = setContext(async (request, { headers }) => {
//   // set token as refreshToken for refreshing token request
//   let token = localStorage.getItem('sma.sv1')
//   const refreshToken = localStorage.getItem('refreshToken')
//   const tokenState = getTokenState(token)
//   if (token && tokenState.needRefresh) {
//     const refreshPromise = refreshAuthToken(token, refreshToken)
//   }
//   if (request.operationName === 'refreshUserToken') {
//     const refreshToken = localStorage.getItem('sma.sv1')
//     if (refreshToken) {
//       return {
//         headers: {
//           ...headers,
//           authorization: `Bearer ${refreshToken}`
//         }
//       }
//     } else {
//       return { headers }
//     }
//   }

//   if (token) {
//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${token}`
//       }
//     }
//   } else {
//     return { headers }
//   }
// })

const httpLink = createUploadLink({
    uri: `${ URL_BASE }graphql/`,
    fetchOptions: {
        mode: 'cors'
    },
    credentials: 'include'
})

const authLink = setContext(async (request, { headers }) => {
    const idLasComp = localStorage.getItem('idLasComp')
    if (idLasComp) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${ idLasComp }`
            }
        }
    } else {
        return { headers }
    }
})
function createApolloClient() {
    return new ApolloClient({
        connectToDevTools: true,
        credentials: 'include',
        ssrMode: typeof window === 'undefined',
        link: authLink.concat(httpLink),
        // link: ApolloLink.from([httpLink, authLink]),
        cache: new InMemoryCache(/* {
      typePolicies: {
        Query: {
          getAllCompanyById: concatPagination()
        }
      }
    } */),
        defaultHttpLink: false // this should do the trick
    })
}
export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
    // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))
                )
            ]
        })

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function addApolloState(client, pageProps) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }
    return pageProps
}

const useApollo = PageComponent => {
    const WithApollo = ({ ...pageProps }) => {
        const state = pageProps[APOLLO_STATE_PROP_NAME]
        const client = apolloClient || useMemo(() => initializeApollo(state), [state])
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    }
    return WithApollo
}
export default useApollo

useApollo.propTypes = {
    apolloState: PropTypes.func,
    apolloClient: PropTypes.object
}
