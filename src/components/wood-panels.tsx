"use client";

export function WoodPanels() {
  return (
    <>
      <div className="wood-panel left-0"></div>
      <div className="wood-panel right-0"></div>
      <style jsx global>{`
        .wood-panel {
          position: fixed;
          top: 0;
          bottom: 0;
          z-index: 10;
          width: 50px;
          background: 
            linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%),
            #8B4513;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%),
            repeating-linear-gradient(45deg, #6B2E0A, #6B2E0A 10px, #8B4513 10px, #8B4513 20px);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.7);
        }
        .wood-panel.left-0 {
          left: 0;
        }
        .wood-panel.right-0 {
          right: 0;
        }
        main {
          padding-left: 50px;
          padding-right: 50px;
        }
        @media (max-width: 768px) {
          .wood-panel {
            width: 20px;
          }
          main {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}
