import dynamic from 'next/dynamic'
const Clock = dynamic( () => import('react-live-clock'), { ssr: false })

const WaitInfo: any = () => {

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: "0" }}>Select stores</h1>
                <h3 style={{ margin: "0" }}>click the "Select stores" in the right top conor.</h3>
                <h4 style={{ margin: "0" }}>
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Hong_Kong'} />
                </h4>
            </div>
        </div>
    )
}

export default WaitInfo
