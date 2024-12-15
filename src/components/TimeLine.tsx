import React from 'react';

const Timeline = () => {
  const points = [
    { id: 1, hideDownwards: true, hideUpwards: false, textBelow: 'Point 2 Below', text: 'Point 1', position: 'above' },
    { id: 2, hideDownwards: false, hideUpwards: true, textAbove: 'Point 2 Above', text: 'Point 2', position: 'below' },
    { id: 3, hideDownwards: true, hideUpwards: false, textBelow: 'Point 3 Below', text: 'Point 3', position: 'above' },
    { id: 4, hideDownwards: false, hideUpwards: true, textAbove: 'Point 4 Above', text: 'Point 4', position: 'below' },
    { id: 5, hideDownwards: true, hideUpwards: false, textBelow: 'Point 5 Below', text: 'Point 5', position: 'above' },
 
  ];

  const numPoints = points.length; // Number of points on each line
  const spacing = 8; // Horizontal margin from edges in %
  const topLinePosition = 20; // Top position for the top line
  const middleLinePosition = 100; // Top position for the middle line
  const bottomLinePosition = 180; // Top position for the bottom line
  const lineThickness = 2; // Thickness of the vertical lines
  const pointSize = 4; // Reduced size of points

  // Calculate the vertical spacing between the lines
  const verticalSpacing = middleLinePosition - topLinePosition;

  return (
    <div className="overflow-x-auto text-white">
      <h2 className="text-8xl font-bold mb-4 ms-10 ">TIMELINE</h2>
      
      <div className="relative w-[1200px] sm:w-full h-[320px] mx-auto">
        {/* Top Line */}
        <div className="absolute" style={{ top: `${topLinePosition}px`, width: '100%', backgroundColor: 'gray' }}>
          {points.map((point, index) => (
            !point.hideUpwards && (
              <div
                key={`top-point-${index}`}
                className="absolute"
                style={{
                  width: `${pointSize * 2}px`,
                  height: `${pointSize * 2}px`,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  left: `calc(${spacing}% + ${(index * (100 - 2 * spacing)) / (numPoints - 1)}%)`,
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.5)', // dim white outer ring
                }}
              >
                <div className="w-full h-full bg-gray-200 rounded-full"></div> {/* dark white center */}
                {point.position === 'above' && (
                  <div className="absolute" style={{ top: '-20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                    {point.text}
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        {/* Middle Line */}
        <div className="absolute" style={{ top: `${middleLinePosition}px`, width: '100%', height: '1px', backgroundColor: 'gray' }}>
          {points.map((point, index) => (
            <React.Fragment key={`mid-point-${index}`}>
              {/* Points on the middle line are hidden */}
              {!point.hideDownwards && (
                <div
                  className="absolute bg-gray-400"
                  style={{
                    left: `calc(${spacing}% + ${(index * (100 - 2 * spacing)) / (numPoints - 1)}%)`,
                    top: `0px`,
                    height: `${verticalSpacing}px`,
                    width: `${lineThickness}px`,
                    transform: `translateX(-50%)`,
                  }}
                ></div>
              )}
              {!point.hideUpwards && (
                <div
                  className="absolute bg-gray-400"
                  style={{
                    left: `calc(${spacing}% + ${(index * (100 - 2 * spacing)) / (numPoints - 1)}%)`,
                    top: `-${verticalSpacing}px`,
                    height: `${verticalSpacing}px`,
                    width: `${lineThickness}px`,
                    transform: `translateX(-50%)`,
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="absolute" style={{ top: `${bottomLinePosition}px`, width: '100%', backgroundColor: 'gray' }}>
          {points.map((point, index) => (
            !point.hideDownwards && (
              <div
                key={`bottom-point-${index}`}
                className="absolute"
                style={{
                  width: `${pointSize * 2}px`,
                  height: `${pointSize * 2}px`,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  left: `calc(${spacing}% + ${(index * (100 - 2 * spacing)) / (numPoints - 1)}%)`,
                  transform: `translateX(-50%)`,
                  boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.5)', // dim white outer ring
                }}
              >
                <div className="w-full h-full bg-gray-200 rounded-full"></div> {/* dark white center */}
                {point.position === 'below' && (
                  <div className="absolute" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                    {point.text}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;