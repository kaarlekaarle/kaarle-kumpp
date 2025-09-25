'use client';

export default function FontTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Kaarle ⌘ Kumppanit Font Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-medium mb-6 text-center">Your Specific Character</h2>
          
          <div className="text-center space-y-8">
            <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-medium mb-4 text-green-800">GID: 75, Unicode: U+F8FF</h3>
              
              <div className="text-8xl font-sans mb-4">
                <span className="p-4 border-2 border-green-300 rounded-lg bg-white inline-block">
                  {String.fromCharCode(0xF8FF)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>GID:</strong> 75 (Glyph ID in font)</p>
                <p><strong>Unicode:</strong> U+F8FF (Private Use Area)</p>
                <p><strong>Font:</strong> Kaarle ⌘ Kumppanit Sans</p>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded border">
                <p className="text-sm text-blue-800">
                  <strong>How to read this:</strong><br/>
                  • If you see a proper character → Font includes this glyph ✅<br/>
                  • If you see a square (□) or placeholder → Font doesn't include this character ❌
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}