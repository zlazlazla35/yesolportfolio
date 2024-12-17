import { useEffect, useState } from "react";

function Loading() {

    const [intro, setIntro] = useState('');
    const [intro2, setIntro2] = useState('');

    // 인트로 애니메이션 class
    useEffect(() => {
        const animate = setTimeout(() => {
            setIntro2('on');
        }, 1000);

        const animate2 = setTimeout(() => {
            setIntro('off');
        }, 2000);

        return () => {
            clearTimeout(animate);
            clearTimeout(animate2);
        }
    }, []);


    // 인트로 중일때 스크롤 안되게
    useEffect(() => {
        document.body.style.overflow = "hidden";

        const scrollNone = setTimeout(() => {
            document.body.style.overflow = "unset";
        }, 2000)

        return() => clearTimeout(scrollNone);
    }, [])


    return (
        <div className={`loading_wrap ${intro}`}>
            <div className="loading_inner">
                <h2 className={`title ${intro2}`}>EUNOIA</h2>
            </div>
        </div>
    )
}


// 1초뒤에 off 클레스 붙여주기
export default Loading;