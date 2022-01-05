import loadable from '@loadable/component'

function  Webgl () {
    return (
        <div style={{width:'100vw',height:'100vh',background:'#ff006f',display:'flex',justifyContent:'center',alignItems:'center'}}>正在加载中</div>
    )
}

const WebglPage = loadable(() => import('../csr/webgl3'), {
    fallback: <Webgl/>,
})
export default WebglPage
