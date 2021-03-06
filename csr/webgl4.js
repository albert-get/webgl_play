import {useEffect, useRef} from "react";

function Index(){
    const canvasEle = useRef(null)
    useEffect(()=>{
        let v3PositionIndex = 0
        let canvas = canvasEle.current
        let webgl = canvas.getContext('webgl')
        webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight)
        let vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER)
        let fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER)
        webgl.shaderSource(vertexShaderObject,
            `attribute vec3 v3Position;
            void main(void){
                gl_Position = vec4(v3Position,1.0);
            }
            `)
        webgl.shaderSource(fragmentShaderObject,
            `void main(void){
                gl_FragColor = vec4(1.0,1.0,1.0,1.0);
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
        let jsArrayDats=[
            0.0,1.0,0.0,
            -1.0,0.0,0.0,
            1.0,0.0,0.0
        ]
        let triangleBuffer = webgl.createBuffer()
        webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer)
        webgl.bufferData(webgl.ARRAY_BUFFER,new Float32Array(jsArrayDats),webgl.STATIC_DRAW)

        webgl.clearColor(0.0,0.0,0.0,1.0)
        webgl.clear(webgl.COLOR_BUFFER_BIT)

        // webgl.bindBuffer(webgl.ARRAY_BUFFER,triangleBuffer)
        webgl.enableVertexAttribArray(v3PositionIndex)
        webgl.vertexAttribPointer(v3PositionIndex,3,webgl.FLOAT,false,0,0)
        // webgl.drawArrays(webgl.LINE_STRIP,0,3)
        webgl.drawArrays(webgl.LINE_LOOP,0,3)

    },[])
    return(
        <canvas ref={canvasEle} width={window.screen.width} height={window.screen.height}>??????????????????????????????????????????????????????</canvas>
    )
}
export default Index

//???????????????
//???????????????
//??????
//?????????
//???????????????
//???????????????
//???????????????


//????????????
//????????????
//????????????
//??????