import {useEffect, useRef} from "react";

function Index(){
    const canvasEle = useRef(null)
    useEffect(()=>{
        let v3PositionIndex = 0
        let uniformColor = 0
        let uniformAnim = 0
        let animTime = 0
        let canvas = canvasEle.current
        let webgl = canvas.getContext('webgl')
        webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight)
        let vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER)
        let fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER)
        webgl.shaderSource(vertexShaderObject,
            `
            precision lowp float;
            attribute vec3 v3Position;
            uniform float anim;
            void main(void){
                gl_Position = vec4(v3Position.x + anim,v3Position.y,v3Position.z,1.0);
            }
            `)
        webgl.shaderSource(fragmentShaderObject,
            `
            precision lowp float;
            uniform vec4 color;
            void main(void){
                gl_FragColor = color;
            }
            `)
        webgl.compileShader(vertexShaderObject)
        webgl.compileShader(fragmentShaderObject)
        if (!webgl.getShaderParameter(vertexShaderObject,webgl.COMPILE_STATUS)){
            alert('error:vertexShaderObject')
            return;
        }
        if (!webgl.getShaderParameter(fragmentShaderObject,webgl.COMPILE_STATUS)){
            alert('error:fragmentShaderObject')
            return;
        }
        let programObject1 = webgl.createProgram();
        let programObject = webgl.createProgram();
        webgl.attachShader(programObject,vertexShaderObject)
        webgl.attachShader(programObject,fragmentShaderObject);
        webgl.bindAttribLocation(programObject,v3PositionIndex,'v3Position')

        webgl.linkProgram(programObject)
        if (!webgl.getProgramParameter(programObject,webgl.LINK_STATUS)){
            alert('error:programObject')
            return;
        }
        webgl.useProgram(programObject)

        //向显卡里面写数据
        let jsArrayDats=[
            0.0,1.0,0.0,
            -1.0,0.0,0.0,
            1.0,0.0,0.0
        ]
        uniformColor = webgl.getUniformLocation(programObject,'color')
        webgl.uniform4f(uniformColor,1,0,0,1)

        uniformAnim = webgl.getUniformLocation(programObject,'anim')
        
        let triangleBuffer = webgl.createBuffer()
        webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer)
        webgl.bufferData(webgl.ARRAY_BUFFER,new Float32Array(jsArrayDats),webgl.STATIC_DRAW)
        //
        let flag = false
        function renderScene(){
            webgl.useProgram(programObject)//指明用那个程序
            webgl.clearColor(0.0,0.0,0.0,1.0)
            webgl.clear(webgl.COLOR_BUFFER_BIT)
            if (animTime>=2){
                flag = true
            }
            if (animTime<=-2){
                flag = false
            }
            if (!flag){
                animTime += 0.01
            }else {
                animTime -= 0.01
            }

            webgl.uniform1f(uniformAnim,animTime)
            webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer)//指明用那个缓冲区
            webgl.enableVertexAttribArray(v3PositionIndex)
            webgl.vertexAttribPointer(v3PositionIndex,3,webgl.FLOAT,false,0,0)
            webgl.drawArrays(webgl.TRIANGLES,0,3)
            requestAnimationFrame(renderScene)
        }
        renderScene()
    },[])
    return(
        <canvas ref={canvasEle} width={window.screen.width} height={window.screen.height}>你的浏览器不支持，请更新或更换浏览器</canvas>
    )
}
export default Index

//顶点缓冲区
//索引缓冲区
//纹理
//帧缓冲
//深度缓冲区
//颜色缓冲区
//模版缓冲区


//模型矩阵
//观察矩阵
//投影矩阵
//视口