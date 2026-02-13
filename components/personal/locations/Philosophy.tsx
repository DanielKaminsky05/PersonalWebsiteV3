import personalMapData from "@/data/personalMap.json";

export default function Philosophy() {
  const data = personalMapData.find(d => d.id === "philosophy");
  
  if (!data) return null;

  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-light text-white mb-6 capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        {data.title}
      </h2>
      <div className="text-gray-300 text-lg md:text-xl leading-relaxed font-light tracking-wide">
          {data.description.map((text, i) => (
             <p key={i} className="mb-4 last:mb-0">{text}</p>
          ))}
      </div>
    </div>
  );
}
