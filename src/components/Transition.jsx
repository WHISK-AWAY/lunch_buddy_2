import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';

import gsap from 'gsap';

export default function TransitionComponent({ children }) {
  const location = useLocation();

  const transitionWrapperRef = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        nodeRef={transitionWrapperRef}
        // unmountOnExit={true}
        key={location.pathname}
        timeout={250}
        onEnter={() => {
          gsap.set(transitionWrapperRef.current, {
            opacity: 0,
          });
          gsap
            .timeline({ paused: true })
            .to(transitionWrapperRef.current, {
              opacity: 1,
              duration: 0.5,
            })
            .play();
        }}
        onExit={() => {
          gsap
            .timeline({ paused: true })
            .to(transitionWrapperRef.current, {
              opacity: 0,
              duration: 0.5,
            })
            .play();
        }}
      >
        <div className="bg-white dark:bg-black" ref={transitionWrapperRef}>
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
}
