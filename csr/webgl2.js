import {useEffect, useRef} from "react";

function Index(){
    const canvasEle = useRef(null)
    useEffect(()=>{
        let v3PositionIndex = 0
        let inColor = 1
        let canvas = canvasEle.current
        let webgl = canvas.getContext('webgl')
        webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight)
        let vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER)
        let fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER)
        webgl.shaderSource(vertexShaderObject,
            `
            precision lowp float;
            attribute vec3 v3Position;
            attribute vec4 inColor;
            varying vec4 outColor;
            void main(void){
                outColor = inColor;
                gl_Position = vec4(v3Position,1.0);
            }
            `)
        webgl.shaderSource(fragmentShaderObject,
            `
            precision lowp float;
            varying vec4 outColor;
            void main(void){
                gl_FragColor = outColor;
            }
            `)
        webgl.compileShader(vertexShaderObject)
        webgl.compileShader(fragmentShaderObject)
        if (!webgl.getShaderParameter(vertexShaderObject,webgl.COMPILE_STATUS)){
            let err = webgl.getShaderInfoLog(vertexShaderObject)
            alert(err)
            return;
        }
        if (!webgl.getShaderParameter(fragmentShaderObject,webgl.COMPILE_STATUS)){
            let err = webgl.getShaderInfoLog(fragmentShaderObject)
            alert(err)
            return;
        }
        let programObject = webgl.createProgram();
        webgl.attachShader(programObject,vertexShaderObject)
        webgl.attachShader(programObject,fragmentShaderObject);
        webgl.bindAttribLocation(programObject,v3PositionIndex,'v3Position')
        webgl.bindAttribLocation(programObject,inColor,'inColor')
        webgl.linkProgram(programObject)
        if (!webgl.getProgramParameter(programObject,webgl.LINK_STATUS)){
            let err = webgl.getProgramInfoLog(programObject)
            alert(err)
            return;
        }
        webgl.useProgram(programObject)

        // let jsArrayDats=[
        //     -0.5,+0.5,0.0,
        //     +0.5,+0.5,0.0,
        //     +0.5,-0.5,0.0,
        //     -0.5,-0.5,0.0,
        //
        // ]
        // let triangleBuffer = webgl.createBuffer()
        // webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer)
        // webgl.bufferData(webgl.ARRAY_BUFFER,new Float32Array(jsArrayDats),webgl.STATIC_DRAW)
        let jsArrayData2=[
            -1.0,+1.0,0.0,1.0,0.0,0.0,1.0,
            +1.0,+1.0,0.0,0.0,1.0,0.0,1.0,
            +1.0,-1.0,0.0,0.0,0.0,1.0,1.0,
            -1.0,-1.0,0.0,1.0,1.0,0.0,1.0,
        ]
        let triangleBuffer2 = webgl.createBuffer()
        webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer2)
        webgl.bufferData(webgl.ARRAY_BUFFER,new Float32Array(jsArrayData2),webgl.STATIC_DRAW)
        let indexData=[
            0,1,2,
            0,2,3
        ]
        let indexBuffer = webgl.createBuffer()
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER,indexBuffer)
        webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexData),webgl.STATIC_DRAW)

        webgl.clearColor(0.0,0.0,0.0,1.0)
        webgl.clear(webgl.COLOR_BUFFER_BIT)

        webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer2)
        webgl.enableVertexAttribArray(v3PositionIndex)
        webgl.enableVertexAttribArray(inColor)

        webgl.vertexAttribPointer(v3PositionIndex,3,webgl.FLOAT,false,4*7,0)

        webgl.vertexAttribPointer(inColor,4,webgl.FLOAT,false,4*7,12)
        webgl.drawElements(webgl.TRIANGLES,6,webgl.UNSIGNED_SHORT,0)

    },[])
    return(
        <canvas ref={canvasEle} width={window.screen.height} height={window.screen.height}>你的浏览器不支持，请更新或更换浏览器</canvas>
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