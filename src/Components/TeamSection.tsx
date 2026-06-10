import { useState } from "react";

const team = [
  {
    initials: "LA",
    avatar: "/lena-avatar.png",
    name: "Lena Artig",
    role: "Gründerin & Designerin",
    bio: "Lena begann mit Makramee in ihrer kleinen Küche – heute kreiert sie Unikate, die in ganz Europa verkauft werden. Jedes Stück trägt ihre Handschrift.",
    color: "#c4a882",
    tag: "seit 2019",
    fact: "🪢 über 400 Knoten pro Wandbild",
  },
  {
    initials: "MM",
    avatar: "/mia_avatar.png",
    name: "Mia Müller",
    role: "Kreativleiterin",
    bio: "Mia bringt frische Farben und moderne Muster ins Sortiment. Ihre Boho-Kollektion war innerhalb von 48 Stunden ausverkauft.",
    color: "#a8c4b0",
    tag: "seit 2021",
    fact: "🎨 12 neue Designs pro Saison",
  },
  {
    initials: "SK",
    avatar: "/sara-avatar.png",
    avatarPosition: "object-top",
    name: "Sara Klein",
    role: "Kundenservice",
    bio: "Sara sorgt dafür, dass jede Bestellung mit Liebe verpackt wird. Ihre persönlichen Nachrichten im Paket machen den Unterschied.",
    color: "#c4b0c2",
    tag: "seit 2022",
    fact: "💌 98 % zufriedene Kunden",
  },
  {
    initials: "JB",
    avatar: "/jana-avatar.png",
    name: "Jana Braun",
    role: "Textilkuratorin",
    bio: "Jana wählt ausschließlich nachhaltige Materialien – natürliche Baumwolle, recycelte Fasern. Schönheit soll keine Kompromisse brauchen.",
    color: "#b8c4a8",
    tag: "seit 2023",
    fact: "🌿 100 % Naturmaterialien",
  },
];

export default function TeamSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#faf8f5] py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-[#b08060]">
            Hinter den Kulissen
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
            Die Menschen hinter jedem Knoten
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Unser kleines Team steckt viel Leidenschaft und Handarbeit in jedes einzelne Stück. Lern uns kennen!
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative bg-white rounded-3xl p-6 border border-gray-100 transition-all duration-300 overflow-hidden cursor-default"
              style={{
                boxShadow:
                  hovered === i
                    ? `0 12px 40px 0 ${member.color}55`
                    : "0 2px 12px 0 #0000000a",
                transform: hovered === i ? "translateY(-3px)" : undefined,
              }}
            >
              {/* Decorative blob */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 transition-all duration-500"
                style={{
                  backgroundColor: member.color,
                  transform: hovered === i ? "scale(1.3)" : "scale(1)",
                }}
              />

              <div className="relative flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl overflow-hidden shadow-md shrink-0 flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar
                    ? <img src={member.avatar} alt={member.name} className={`w-full h-full object-cover ${"avatarPosition" in member ? member.avatarPosition : "object-center"}`} />
                    : member.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800 text-base leading-tight">
                      {member.name}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Fun fact chip */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700"
                style={{ backgroundColor: `${member.color}22` }}
              >
                {member.fact}
              </div>
            </div>
          ))}
        </div>

        {/* Quote strip */}
        <div className="mt-12 bg-white border border-gray-100 rounded-3xl px-8 py-8 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
            „Handgemacht mit Liebe –
            <span className="text-[#c4a882]"> jedes Mal.</span>"
          </p>
          <p className="text-sm text-gray-400">Das Makramee-Team</p>
        </div>

      </div>
    </section>
  );
}
