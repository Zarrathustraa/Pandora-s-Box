import React from 'react'

const Pagelayout = (
    {children}: {children:React.ReactNode }
) => {
    return (
        <>
        <h1>Page Navbar</h1>
        {children}
        <h1>Page Footer</h1>
        </>
    )
}

export default Pagelayout