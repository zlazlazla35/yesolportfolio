import './App.css';
import { Reset } from 'styled-reset';
import Loading from './component/Loading';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCode, faGraduationCap, faYenSign, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { keyframes, styled } from 'styled-components'
import { motion } from "framer-motion";


import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
gsap.registerPlugin(ScrollTrigger)


const animation2 = keyframes`
  0% {
    background-position: 0;
  }
  100% {
    background-position: 100%;
  }
  `;

const TextAni2 = styled.h2`
  font-size: 96px; 
  font-weight: 800; 
  background: linear-gradient(90deg,#383838,#7e53f2 15%,#5019e8 35%,#383838 50%,#7e53f2 65%,#5019e8 85%,#383838);  
  -webkit-text-fill-color: transparent; background-clip: text; 
  background-size: 200% 100%;
  animation: ${animation2} 3.5s linear infinite;
`;




function App() {
  const [mode, setMode] = useState(true);
  const [heaer, setHeader] = useState('');
  const [isHovering, setIsHovering] = useState(false)
  const [isHovering2, setIsHovering2] = useState(false)
  const [isHovering3, setIsHovering3] = useState(false)
  const [isHovering4, setIsHovering4] = useState(false)
  const [visual, setVisual] = useState('');






  // 렌더링 시 스크롤 최상단 && 로컬스토리 초기값 저장 후 렌더링 시 그 데이터 가져오기
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };

    const localData = localStorage.getItem("mode");
    if (localData) {
      setMode(JSON.parse(localData));
    }
  }, []);


  // mode 변동이있을때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // 스크롤시 네비 쉐도우
  const handleScroll = () => {
    if (window.scrollY >= document.querySelector('.nav_box .nav_inner').offsetHeight) {
      setHeader('on');
    } else {
      setHeader('');
    }
  };









  // 스크롤 애니메이션
  useGSAP(() => {
    const ani1 = gsap.timeline();


    // const visual = () => {
    //   let section2 = document.querySelector('.section1 .section1_inner').offsetWidth
    //   let box = document.querySelector('.section1 .section1_inner .title_box2').offsetWidth
    //   let width = section2 - box


    //   gsap.to('.section1 .section1_inner .title_box2', {
    //     duration: 2,
    //     x: -width,
    //     y: 0 - box,
    //     rotate: 360,



    //     scrollTrigger: {
    //       trigger: '.section1 .section1_inner .title_box2',
    //       start: "top 60%",
    //       end: 'bottom 40%',
    //       scrub: true,
    //       pin: true,
    //       markers: true
    //     }
    //   });
    //   window.addEventListener("resize", ScrollTrigger.update);
    // }

    // visual();








    ani1.to(".section4 .section4_inner .t1", { transform: 'translate(0px,0)' }, "text")
      .to(".section4 .section4_inner .t2", { transform: 'translate(0px,0)' }, "text")
      .to(".section4 .section4_inner .t3", { transform: 'translate(0px,0)' }, "text")

    ScrollTrigger.create({
      animation: ani1,
      trigger: ".section4",
      start: "top top",
      end: "+=3000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      // markers: true

    });

    gsap.to(".section4", {
      backgroundColor: '#837262',
      duration: 2,

      scrollTrigger: {
        trigger: ".section4",
        start: "top top",
        end: "bottom top",
        // markers: true,
        scrub: 0,
      }
    })

    let sections = gsap.utils.toArray(".section5 .section5_inner .web_list li");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".section5",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=7000",
        // markers: true,
      }
    });

  }, [])


  useEffect(() => {
    const animate = setTimeout(() => {
      setVisual('on')
    }, 2100);

    return () => {
      clearTimeout(animate);
    }
  }, [window.innerWidth])






















  const scrollCallBack = () => {
    document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollCallBack2 = () => {
    document.getElementById('webSite')?.scrollIntoView({ behavior: 'smooth' });
  }






  return (
    <div className={mode ? 'App darkMode' : 'App'} >
      <Reset />
      <Loading />
      <div className='main_wrap'>
        <div className='main_inner'>
          <div className={`nav_box ${heaer}`}>
            <div className='nav_inner w1610'>
              <div className='left_menu'>
                <h2 className='logo'>
                  <NavLink>
                    {
                      mode ? <img src={`${process.env.PUBLIC_URL}/image/logo_d.png`} alt="" /> : <img src={`${process.env.PUBLIC_URL}/image/logo_w.png`} alt="" />
                    }
                  </NavLink>
                </h2>
                <ul>
                  <li>
                    <NavLink onClick={(() => { scrollCallBack() })}>javaScript / React</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={(() => { scrollCallBack2() })}>Web Site</NavLink>
                  </li>
                </ul>
              </div>
              <div className='right_menu'>
                <div className={mode ? 'mode_box darkMode' : 'mode_box'} onClick={(() => { setMode(!mode) })}>
                  <div className='modeCircle'></div>
                </div>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={
              <div className='index_wrap'>
                <div className='index_inner'>
                  <div className='section1'>
                    <div className='section1_inner w1610'>
                      <div className='title_box1'>
                        <h2>SHINING</h2>
                        <h2>PORTFOLIO</h2>
                      </div>
                      <div className={`video_box`}>
                        <div className={`video_box_inner ${visual}`}>
                          <video muted autoPlay loop>
                            <source src="/videos/visual.mp4" type="video/mp4" />
                          </video>
                        </div>
                      </div>
                      <div className='title_box2'>
                        <h2>KIM</h2>
                        <h2>YE-SOL</h2>
                      </div>
                      <div className='title_box3'>
                        <h2>KIM</h2>
                        <h2>YE-SOL</h2>
                      </div>
                    </div>
                  </div>
                  <div className='section2'>
                    <div className='section2_inner w1610'>
                      {/* <div className='title_box2 two'>
                        <h2>KIM</h2>
                        <h2>YE-SOL</h2>
                      </div> */}
                      <ul>
                        <li onMouseOver={(() => { setIsHovering(true) })} onMouseOut={(() => { setIsHovering(false) })}>
                          <img className={isHovering ? 'on' : null} src={`${process.env.PUBLIC_URL}/image/record1.svg`} alt="" />
                          <div className='top'>
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <div className='top_right'>
                              <h2 className='num'>1<span>Number</span></h2>
                              <h4 className='border'>2014.03 ~ 2017.02</h4>
                            </div>
                          </div>
                          <h5 className='tag'>#서울예술대학교</h5>
                          <h5 className='tag'>#무용과</h5>
                          <h5 className='tag'>#한국무용</h5>
                        </li>
                        <li onMouseOver={(() => { setIsHovering2(true) })} onMouseOut={(() => { setIsHovering2(false) })}>
                          <img className={isHovering2 ? 'on' : null} src={`${process.env.PUBLIC_URL}/image/record2.jpg`} alt="" />
                          <div className='top'>
                            <FontAwesomeIcon icon={faYenSign} />
                            <div className='top_right'>
                              <h2 className='num'>2<span>Number</span></h2>
                              <h4 className='border'>2019.03 ~ 2020.03</h4>
                            </div>
                          </div>
                          <h5 className='tag'>#일본 워킹홀리데이</h5>
                          <h5 className='tag'>#해외문화 습득</h5>
                          <h5 className='tag'>#회화, 독해, 청해 언어능력</h5>
                        </li>
                        <li onMouseOver={(() => { setIsHovering3(true) })} onMouseOut={(() => { setIsHovering3(false) })}>
                          <img className={isHovering3 ? 'on' : null} src={`${process.env.PUBLIC_URL}/image/record3.jpg`} alt="" />
                          <div className='top'>
                            <FontAwesomeIcon icon={faCode} />
                            <div className='top_right'>
                              <h2 className='num'>3<span>Number</span></h2>
                              <h4 className='border'>2022.03 ~ 2022.08</h4>
                            </div>
                          </div>
                          <h5 className='tag'>#이젠아카데미</h5>
                          <h5 className='tag'>#html,css,jsvascript</h5>
                          <h5 className='tag'>#Photoshop, Illustrator</h5>
                          <h5 className='tag'>#UI/UX</h5>
                          <h5 className='tag'>#웹디자인기능사 취득</h5>
                        </li>
                        <li onMouseOver={(() => { setIsHovering4(true) })} onMouseOut={(() => { setIsHovering4(false) })}>
                          <img className={isHovering4 ? 'on' : null} src={`${process.env.PUBLIC_URL}/image/record4.png`} alt="" />
                          <div className='top'>
                            <FontAwesomeIcon icon={faBuilding} />
                            <div className='top_right'>
                              <h2 className='num'>4<span>Number</span></h2>
                              <h4 className='border'>2023.05 ~ 2024.06</h4>
                            </div>
                          </div>
                          <h5 className='tag'>#주식회사오케이소프트</h5>
                          <h5 className='tag'>#퍼블리싱</h5>
                          <h5 className='tag'>#홈페이지 제작</h5>
                          <h5 className='tag'>#유지보수</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='section3' id='project'>
                    <div className='section3_inner w1610'>
                      <motion.div
                        initial={{ opacity: 0, y: -70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          ease: 'easeInOut',
                          duration: 1.2,
                        }}
                      >
                        <h2 className='title_txt'>Project</h2>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: -90 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          ease: 'easeInOut',
                          duration: 1.5,
                        }}
                      >
                        <h4 className='sub_txt'>Vanilla JS, React를 이용한 프로젝트입니다.</h4>
                      </motion.div>
                      <TestScrollTrigger useGSAP={useGSAP} />
                    </div>
                  </div>
                  <div className='section4'>
                    <div className='section4_inner w1610'>
                      <div className="parallax__item__text t1">Web Site</div>
                      <div className="parallax__item__text t2">Mobile</div>
                      <div className="parallax__item__text t3">App</div>
                    </div>
                  </div>
                  <div className='section5' id='webSite'>
                    <div className='section5_inner'>
                      <ul className='web_list'>
                        <li className='slide_main'>
                          <NavLink to={'/'}>
                            <div className='scroll_slide'>
                              <div className='title_box'>
                                <motion.div
                                  initial={{ opacity: 0, y: -70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='title'>현재까지 제작 완료한</h2>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: -90 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.4,
                                  }}
                                >
                                  <h2 className='title'>프로젝트를 소개드립니다.</h2>
                                </motion.div>
                              </div>
                              <motion.div className='subTitle_box'
                                initial={{ opacity: 0, y: -150 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                  ease: 'easeInOut',
                                  duration: 2,
                                }}
                              >
                                <p>1년 동안 투입되어 진행한 홈페이지입니다.</p>
                                <p>PC, Mobile, 유지 보수, 웹 기반 어플리케이션 등 다양한 경험을 통해</p>
                                <p>코드 제작 외 다른 사람의 코드 수정, 업그레이드 작업 등을 진행해왔습니다.</p>
                              </motion.div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://xn--mbc-kk1ml3iorr2kbk30b2pt.xn--9d0bp01avxcfrg8lbok0sv97g.com/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite1.png`} alt="_blank" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>요양보호사</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>반응형</span>
                                  <span>커스텀 페이지</span>
                                </div>
                                <h4>최고 관리자가 홈페이지 커스텀이 가능합니다.</h4>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://play.google.com/store/apps/details?id=com.dolbomi.app&hl=ko'} target='_blank' >
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite2.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>OK돌보미</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>웹 기반 어플</span>
                                </div>
                                <h4>App Store에서 다운로드 가능합니다</h4>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://kfp2023.cafe24.com/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite4.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>한국패션심리연구원</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>모바일 퍼블리싱 100% </span>
                                  <span>적응형</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://eslab.co.kr/index.php'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite5.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>한국진로개발원</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>반응형</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://lws3.mycafe24.com/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite6.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>애듀바이블</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>반응형</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://okaysoft.co.kr/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite7.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>오케이소프트</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>리뉴얼</span>
                                  <span>반응형</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://naewonjungsa1.cafe24.com/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite8.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>내원정사유치원</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>모바일 퍼블리싱 100% </span>
                                  <span>적응형</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://lws5.mycafe24.com/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite3.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>진진캠퍼스</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>PC</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'https://moneymind.co.kr/'} target='_blank'>
                            <div className='web_site_list'>
                              <div className='imgBox'>
                                <img src={`${process.env.PUBLIC_URL}/image/webSite9.png`} alt="" />
                              </div>
                              <div className='web_site_info'>
                                <motion.div
                                  initial={{ opacity: 0, y: 70 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ease: 'easeInOut',
                                    duration: 1.2,
                                  }}
                                >
                                  <h2 className='siteName'>머니마인드72랜딩</h2>
                                </motion.div>
                              </div>
                              <div className='web_site_bottom'>
                                <div className='info_list'>
                                  <span>퍼블리싱 100%</span>
                                  <span>랜딩페이지</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='section6'>
                    <div className='section6_inner'>
                      <div className='video_box'>
                        <video muted autoPlay loop>
                          <source src="/videos/visual.mp4" type="video/mp4" />
                        </video>
                        <div className='text_box w1610'>
                          <h2 className='name'>KIM-YESOL</h2>
                          <ul>
                            <li>email : ww_kw@naver.com</li>
                            <li>phone : 010-2376-5689</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/webSite" element={<h2>webSite</h2>} />
            <Route path="/project" element={<h2>project</h2>} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;

function TestScrollTrigger({ useGSAP }) {

  useGSAP(() => {
    gsap.utils.toArray('.section3 .section3_inner .project_box .list').forEach((panel) => {
      gsap.to(panel, {
        width: '100%',
        duration: 2,
        scrollTrigger: {
          trigger: panel,
          start: "top 50%",
          end: "bottom 50%",
          // markers: true, 
          scrub: 1
        }
      })
    })

  }, [])

  return (
    <>
      <div className='project_box'>
        <div className='list list1' style={{
          width: "90%"
        }}>
          <NavLink to={'/'} target='_blank'>
            <video muted autoPlay loop>
              <source src="/videos/project1.mp4" type="video/mp4" />
            </video>
            <div className='project_info'>
              <div className='project_info_text'>
                <h2 className='title'>AENIJOA<span>(애니메이션 추천)</span></h2>
                {/* <button>view <FontAwesomeIcon icon={faArrowRight} /></button> */}
                <ul className='tagList'>
                  <li>#React</li>
                  <li>#css</li>
                  <li>#router</li>
                  <li>#Component</li>
                  <li>#Local Storage</li>
                </ul>
                <p className='info'>
                  JSON 데이터 형식과 빠른 데이터 검색에 중점을 둔 사이트입니다.<br />
                </p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className='list list2' style={{
          width: "90%"
        }}>
          <NavLink to={'https://zlazlazla35.github.io/'} target='_blank'>
            <video muted autoPlay loop>
              <source src="/videos/project2.mp4" type="video/mp4" />
            </video>
            <div className='project_info'>
              <div className='project_info_text'>
                <h2 className='title'>Weather<span>(현재 날씨, 예보 확인)</span></h2>
                <ul className='tagList'>
                  <li>#React</li>
                  <li>#css</li>
                  <li>#Geolocation API</li>
                  <li>#OpenWeather API</li>
                  <li>#axois</li>
                </ul>
                <p className='info'>
                  OpenWeather API를 활용하여 3일 치의 날씨 예보, <br/>
                  날씨에 따른 간단한 알림 글을 제공하는 사이트입니다.
                </p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className='list list3' style={{
          width: "90%"
        }}>
          <NavLink to={'http://zlazlazla35.dothome.co.kr/'} target='_blank'>
            <video muted autoPlay loop>
              <source src="/videos/project3.mp4" type="video/mp4" />
            </video>
            <div className='project_info'>
              <div className='project_info_text'>
                <h2 className='title'>To Do List<span>(일과 정리)</span></h2>
                <ul className='tagList'>
                  <li>#html</li>
                  <li>#Vanilla JS</li>
                  <li>#css</li>
                  <li>#Local Storage</li>
                </ul>
                <p className='info'>
                  일과를 정리하는 사이트입니다.
                </p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className='list list4' style={{
          width: "90%"
        }}>
          <NavLink to={'https://zlazlazla35.github.io/calculator/'} target='_blank'>
            <video muted autoPlay loop>
              <source src="/videos/project4.mp4" type="video/mp4" />
            </video>
            <div className='project_info'>
              <div className='project_info_text'>
                <h2 className='title'>Calculator<span>(계산 기능)</span></h2>
                <ul className='tagList'>
                  <li>#React</li>
                  <li>#css</li>
                  <li>#Styled Component</li>
                </ul>
                <p className='info'>
                  useState와 switch를 사용해 계산 기능을 구현하였습니다.
                </p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className='list list5' style={{
          width: "90%"
        }}>
          <NavLink to={'/'} onClick={()=>{ alert('현재 개발 중 입니다.') }}>
            <div className="img_box">
              <img src={`${process.env.PUBLIC_URL}/image/cyworld_project.png`} />
            </div>
            <div className='project_info'>
              <div className='project_info_text'>
                <h2 className='title'>Cyworld<span>(게시판 기능)</span></h2>
                <ul className='tagList'>
                  <li>#Next.js</li>
                  <li>#MongoDB</li>
                  <li>#Next-Auth</li>
                  <li>#css</li>
                </ul>
                <p className='info'>
                OAuth + session 방식과 아이디/비번 + JWT를 활용하여<br/>
                회원가입 기능과 각 홈페이지에 방문하여<br/> 
                댓글, 사진 등을 올릴 수 있는 <br/> 게시판 기능 구현 홈페이지 현재 개발 중 입니다.
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>


  )
}

