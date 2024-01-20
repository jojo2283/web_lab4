import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setUserData } from '../actions/userActions';
const CanvasComponent = () => {

    const canvasRef = useRef(null);

    const dispatch = useDispatch();
    const radius = useSelector((state) => state.radius.radius);
    const userData = useSelector((state) => state.user.userData);
    const userId = useSelector(state => state.user.userId);

    const drawCircle = (ctx, radius, width, height) => {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        if (radius > 0) {
            ctx.arc(width / 2, height / 2, radius / 2, 0, Math.PI / 2, false);
        } else {
            ctx.arc(width / 2, height / 2, -radius / 2, Math.PI, 1.5 * Math.PI, false);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(51, 153, 255, 1)';
        ctx.fill();
    };

    const drawTriangle = (ctx, radius, width, height) => {
        ctx.beginPath();
        ctx.moveTo(width / 2 - radius / 2, height / 2);
        ctx.lineTo(width / 2, height / 2 - radius);
        ctx.lineTo(width / 2, height / 2);
        ctx.lineTo(width / 2 - radius / 2, height / 2)
        ctx.closePath();
        ctx.fillStyle = 'rgba(51, 153, 255, 1)';
        ctx.fill();
    };

    const drawSquare = (ctx, radius, width, height) => {
        ctx.beginPath();
        ctx.rect(width / 2, height / 2, radius, -radius);
        ctx.fillStyle = 'rgba(51, 153, 255, 1)';
        ctx.fill();
    };

    const drawAxes = (context, width, height) => {
        context.beginPath();
        context.moveTo(width / 2, 0);
        context.lineTo(width / 2, height);
        context.moveTo(0, height / 2);
        context.lineTo(width, height / 2);
        context.strokeStyle = 'black';
        context.stroke();
    };
    const drawMark = (ctx, radius, width, height) => {
        ctx.beginPath();
        ctx.moveTo(width / 2 - 4, height / 2 - radius / 2);
        ctx.lineTo(width / 2 + 4, height / 2 - radius / 2);

        ctx.moveTo(width / 2 - 4, height / 2 - radius);
        ctx.lineTo(width / 2 + 4, height / 2 - radius);

        ctx.moveTo(width / 2 - 4, height / 2 + radius);
        ctx.lineTo(width / 2 + 4, height / 2 + radius);

        ctx.moveTo(width / 2 - 4, height / 2 + radius / 2);
        ctx.lineTo(width / 2 + 4, height / 2 + radius / 2);


        ctx.moveTo(width / 2 + radius / 2, height / 2 + 4);
        ctx.lineTo(width / 2 + radius / 2, height / 2 - 4);

        ctx.moveTo(width / 2 + radius, height / 2 + 4);
        ctx.lineTo(width / 2 + radius, height / 2 - 4);

        ctx.moveTo(width / 2 - radius / 2, height / 2 + 4);
        ctx.lineTo(width / 2 - radius / 2, height / 2 - 4);

        ctx.moveTo(width / 2 - radius, height / 2 + 4);
        ctx.lineTo(width / 2 - radius, height / 2 - 4);

        ctx.strokeStyle = 'black';
        ctx.stroke();

    };
    const drawText = (ctx, radius, width, height) => {
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("R/2", width / 2 + 8, height / 2 - radius / 2);
        ctx.fillText("R/2", width / 2 + radius / 2, height / 2 - 8);
        ctx.fillText("R/2", width / 2 + 8, height / 2 + radius / 2);
        ctx.fillText("R/2", width / 2 - radius / 2, height / 2 - 8);
        ctx.fillText("R", width / 2 + 8, height / 2 - radius);
        ctx.fillText("R", width / 2 + radius, height / 2 - 8);
        ctx.fillText("R", width / 2 + 8, height / 2 + radius);
        ctx.fillText("R", width / 2 - radius, height / 2 - 8);
    };
    const drawArrows = (ctx, width, height) => {
        ctx.beginPath();
        ctx.moveTo(width / 2 - 5, 5)
        ctx.lineTo(width / 2, 0)
        ctx.lineTo(width / 2 + 5, 5)

        ctx.moveTo(width - 5, height / 2 - 5);
        ctx.lineTo(width, height / 2);
        ctx.lineTo(width - 5, height / 2 + 5);

        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.font = "12px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("y", width / 2 + 8, 12);
        ctx.fillText("x", width - 10, height / 2 - 8);

    };
    const drawPoints = useCallback((ctx, width, height, radius) => {
        userData.forEach(point => {
            ctx.beginPath();
            ctx.arc((point.x * 3 / radius) * 32 + width / 2, -(point.y / radius) * 32 * 3 + height / 2, 5, 0, Math.PI * 2); // Радиус 5 пикселей для точки
            console.log((point.x / radius) * 32 * 3);
            if (point.hit === false) {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = 'green';
            }

            ctx.fill();
        });
    }, [userData]);



    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { width, height } = canvas;

        const handleCanvasClick = async (event) => {
            const xValue = (event.offsetX - canvas.width / 2) / 32;
            const yValue = -(event.offsetY - canvas.height / 2) / 32;
            const url = 'http://localhost:8080/hits';
            const queryParams = { userId: userId };
            const requestBody = { x: Number(xValue), y: Number(yValue), r: Number(radius) };
            const urlWithParams = new URL(url);
            Object.keys(queryParams).forEach(key => urlWithParams.searchParams.append(key, queryParams[key]));

            await fetch(urlWithParams.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const response = await fetch('http://localhost:8080/users?id=' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            const data = await response.json();

            dispatch(setUserData(data.hitsList));
            sessionStorage.setItem('userData', JSON.stringify(data.hitsList));

        };

        canvas.addEventListener('click', handleCanvasClick);


        context.clearRect(0, 0, width, height);

        if (radius != 0) {
            if (radius > 0) {
                drawCircle(context, 3 * 32, width, height);
                drawTriangle(context, 3 * 32, width, height);
                drawSquare(context, 3 * 32, width, height);
            }
            else {
                drawCircle(context, -3 * 32, width, height);
                drawTriangle(context, -3 * 32, width, height);
                drawSquare(context, -3 * 32, width, height);
            }


            drawAxes(context, width, height);
            drawMark(context, 3 * 32, width, height);
            drawText(context, 3 * 32, width, height);
            drawArrows(context, width, height);
            drawPoints(context, width, height, radius);
        } else {
            drawAxes(context, width, height);
            drawArrows(context, width, height);
        }


        return () => {
            canvas.removeEventListener('click', handleCanvasClick);
        }

    }, [radius, userData, drawPoints, dispatch, userId]);


    return <canvas ref={canvasRef} width={320} height={320} style={{ border: '1px solid black' }} />;
};

export default CanvasComponent;
