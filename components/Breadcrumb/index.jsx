/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useRouter } from 'next/router'
import { BreadcrumbBar, Li, Anchor, BreadcrumbTitle } from './styled'
export const RouterCrumbs = () => {
  const router = useRouter()
  const name = router.asPath
  const position = name.indexOf('/')
  const [routes] = useState(['/login', '/register', '/', '/bills'])
  return (
        <>
            {!routes.find(x => x === router.asPath) && (
                <BreadcrumbBar>
                    <Li>
                        <Anchor href="">Home &nbsp;</Anchor>
                        <Anchor route={router.query.id} href={router.asPath}>
                            {name}{name.substr(position - 1, router.asPath.indexOf(router.query.id) - 1)} { router?.query?.id && '>'}
                        </Anchor>
                    </Li>
                    <BreadcrumbTitle>
                        {name.substr(position + 1, router.asPath.indexOf(router.query.id) - 2 || name.length || name.length)}
                    </BreadcrumbTitle>
                </BreadcrumbBar>
            )}
        </>
  )
}
