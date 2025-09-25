"use client";

export default function FontTest() {
  // Basic Latin characters
  const basicLatin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Extended Latin characters
  const extendedLatin = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ";
  
  // Punctuation and symbols
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  
  // Mathematical symbols
  const mathSymbols = "±×÷∞∑∏∫∂∇∆√∝∈∉⊂⊃∪∩∧∨¬→←↑↓↔⇒⇐⇑⇓⇔";
  
  // Geometric shapes
  const shapes = "●○■□▲△▼▽◆◇★☆♠♣♥♦";
  
  // Arrows
  const arrows = "←→↑↓↖↗↘↙↔↕⇐⇒⇑⇓⇔⇕";
  
  // Currency and symbols
  const currency = "€£¥$¢₹₽₩₪₨₦₡₱₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿";
  
  // All printable ASCII characters - static string to avoid hydration issues
  const ascii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  
  // Special symbols including Apple logo - comprehensive Unicode ranges
  const specialSymbols = "⌘⌥⌃⇧⌫⌦⌨⌕⌖⌗⌘⌙⌚⌛⌜⌝⌞⌟⌠⌡⌢⌣⌤⌥⌦⌧⌨⌫⌬⌭⌮⌯⌰⌱⌲⌳⌴⌵⌶⌷⌸⌹⌺⌻⌼⌽⌾⌿⍀⍁⍂⍃⍄⍅⍆⍇⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⍻⍼⍽⍾⍿⎀⎁⎂⎃⎄⎅⎆⎇⎈⎉⎊⎋⎌⎍⎎⎏⎐⎑⎒⎓⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦⎧⎨⎩⎪⎫⎬⎭⎮⎯⎰⎱⎲⎳⎴⎵⎶⎷⎸⎹⎺⎻⎼⎽⎾⎿";
  
  // Extended Unicode ranges for special symbols - static strings to avoid hydration issues
  const extendedSymbols = "          ​‌‍‎‏‐‑‒–—―‖‗'‛‚„‰‱′″‴‵‶‷‸‹‹›‼‽‾‿⁀⁁⁂⁃⁅⁆⁇⁈⁉⁊⁋⁌⁍⁎⁏⁐⁑⁒⁓⁔⁕⁖⁗⁘⁙⁚⁛⁜⁝⁞ ⁠⁡⁢⁣⁤⁥⁦⁧⁨⁩⁪⁫⁬⁭⁮⁯⁰ⁱ⁲⁳⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎₏ₐₑₒₓₔₕₖₗₘₙₚₛₜ₝₞₟₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿";
  
  // Apple and tech symbols specifically - static string
  const appleSymbols = "⌘⌥⌃⇧⌫⌦⌨⌕⌖⌗⌘⌙⌚⌛⌜⌝⌞⌟⌠⌡⌢⌣⌤⌥⌦⌧⌨⌫⌬⌭⌮⌯⌰⌱⌲⌳⌴⌵⌶⌷⌸⌹⌺⌻⌼⌽⌾⌿⍀⍁⍂⍃⍄⍅⍆⍇⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⍻⍼⍽⍾⍿⎀⎁⎂⎃⎄⎅⎆⎇⎈⎉⎊⎋⎌⎍⎎⎏⎐⎑⎒⎓⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦⎧⎨⎩⎪⎫⎬⎭⎮⎯⎰⎱⎲⎳⎴⎵⎶⎷⎸⎹⎺⎻⎼⎽⎾⎿";
  
  // Unicode Private Use Area - static string to avoid hydration issues
  const privateUseArea = "";
  
  // Emoji and symbols
  const emoji = "😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏";
  
  // Unicode blocks to explore
  const unicodeBlocks = [
    { name: "Basic Latin", chars: basicLatin },
    { name: "Extended Latin", chars: extendedLatin },
    { name: "Punctuation", chars: punctuation },
    { name: "Mathematical", chars: mathSymbols },
    { name: "Geometric Shapes", chars: shapes },
    { name: "Arrows", chars: arrows },
    { name: "Currency", chars: currency },
    { name: "Apple & Tech Symbols", chars: appleSymbols },
    { name: "Extended Unicode", chars: extendedSymbols },
    { name: "Private Use Area", chars: privateUseArea },
    { name: "Emoji", chars: emoji },
    { name: "All ASCII", chars: ascii }
  ];

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Kaarle & Kumppanit Font Glyph Viewer</h1>
        
        <div className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Font Information</h2>
          <p className="text-sm text-gray-600">
            This page displays all available characters in the Kaarle & Kumppanit font.
            Look through the sections below to find the perfect character for your logo symbol.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">Looking for the Apple logo (⌘)?</h3>
            <p className="text-sm text-blue-700">
              Check the "Apple & Tech Symbols" section below. The Apple logo is Unicode U+2318.
              If you don't see it there, it might be in the "Extended Unicode" or "Private Use Area" sections.
            </p>
          </div>
        </div>

        {unicodeBlocks.map((block, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
              {block.name}
            </h2>
            <div className="grid grid-cols-10 gap-2 text-2xl">
              {block.chars.split('').map((char, charIndex) => (
                <div 
                  key={charIndex} 
                  className="font-sans p-2 border border-gray-200 rounded text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                  title={`Character: "${char}" (Unicode: U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`}
                >
                  {char}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {block.chars.length} characters
            </div>
          </div>
        ))}

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">How to use this page:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Hover over characters to see their Unicode values</li>
            <li>• Look for geometric shapes, symbols, or special characters that could work as logo elements</li>
            <li>• Common logo symbols are often found in Geometric Shapes, Mathematical, or Currency sections</li>
            <li>• Copy the character you like and use it in your design</li>
          </ul>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded">
          <h3 className="text-lg font-semibold mb-2">Quick Character Search:</h3>
          <div className="text-3xl font-mono">
            <div className="grid grid-cols-20 gap-1">
              {Array.from({length: 256}, (_, i) => String.fromCharCode(i)).map((char, i) => (
                <span 
                  key={i}
                  className="font-sans p-1 hover:bg-yellow-200 rounded cursor-pointer"
                  title={`U+${i.toString(16).toUpperCase().padStart(4, '0')}`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-50 rounded-lg border-2 border-red-200">
          <h3 className="text-lg font-semibold mb-4 text-red-800">🔍 Apple Logo (⌘) Search Results:</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded border">
              <h4 className="font-semibold mb-2">Direct Apple Logo Test:</h4>
              <div className="text-4xl font-mono">
                <span className="font-sans p-2 border-2 border-red-300 rounded" title="Apple Logo U+2318">
                  ⌘
                </span>
                <span className="ml-4 text-sm text-gray-600">Unicode: U+2318</span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded border">
              <h4 className="font-semibold mb-2">Alternative Apple Symbols:</h4>
              <div className="text-2xl space-x-2">
                <span className="font-sans p-1 border rounded" title="U+2318">⌘</span>
                <span className="font-sans p-1 border rounded" title="U+2319">⌙</span>
                <span className="font-sans p-1 border rounded" title="U+231A">⌚</span>
                <span className="font-sans p-1 border rounded" title="U+231B">⌛</span>
                <span className="font-sans p-1 border rounded" title="U+231C">⌜</span>
                <span className="font-sans p-1 border rounded" title="U+231D">⌝</span>
                <span className="font-sans p-1 border rounded" title="U+231E">⌞</span>
                <span className="font-sans p-1 border rounded" title="U+231F">⌟</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded border">
              <h4 className="font-semibold mb-2">Font Support Test:</h4>
              <p className="text-sm text-gray-600 mb-2">
                If the Apple logo (⌘) above looks like a square or placeholder, 
                the Kaarle & Kumppanit font doesn't include this character.
              </p>
              <div className="text-sm text-gray-500">
                <p>• Check if it renders as a proper ⌘ symbol</p>
                <p>• If it shows as □ or ⬜, the font lacks this character</p>
                <p>• Try the alternative symbols above</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
