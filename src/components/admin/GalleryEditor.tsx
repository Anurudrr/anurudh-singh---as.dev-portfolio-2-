import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryEditorProps {
  gallery: any[];
  galleryForm: any | null;
  setGalleryForm: (form: any | null) => void;
  dispatchGallerySave: (e: React.FormEvent) => void;
  dispatchGalleryDelete: (id: string) => void;
}

export default function GalleryEditor({
  gallery,
  galleryForm,
  setGalleryForm,
  dispatchGallerySave,
  dispatchGalleryDelete
}: GalleryEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-black/15 pb-4">
        <h3 className="font-bebas text-2xl tracking-wider text-black">
          GRAPHICAL FOOTPRINT IMAGES ({gallery.length})
        </h3>
        <button
          onClick={() =>
            setGalleryForm({
              title: "",
              description: "",
              tag: "Graphic Design",
              imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800"
            })
          }
          className="font-mono text-[10.5px] font-extrabold bg-[#FFE03A] border-2 border-black text-black px-4 py-2 hover:bg-black hover:text-[#FFE03A] transition-colors cursor-pointer"
        >
          ➕ ADD GALLERY ARTWORK
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map((g) => (
          <div key={g.id} className="border-2 border-black bg-stone-50 p-3 flex flex-col justify-between hover:shadow-[4px_4px_0_#0d0d0d] transition-shadow">
            <div>
              <div className="w-full h-28 border border-black overflow-hidden mb-2 bg-neutral-200 relative">
                <img src={g.imageUrl} alt={g.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                {g.isPlaceholder && (
                  <span className="absolute top-1 left-1 font-mono text-[7px] font-bold bg-[#E8281A] text-white px-1 uppercase tracking-wider">
                    Mock
                  </span>
                )}
              </div>
              <span className="font-mono text-[8px] bg-black text-white px-1.5 py-0.5 uppercase tracking-wider block text-center mb-2">
                {g.tag}
              </span>
              <h4 className="font-mono text-[11px] font-extrabold text-black uppercase block truncate">
                {g.title}
              </h4>
            </div>

            <button
              onClick={() => dispatchGalleryDelete(g.id)}
              className="w-full bg-stone-200 hover:bg-[#E8281A] hover:text-white border border-black mt-4 font-mono text-[10px] py-1 shadow-[1.5px_1.5px_0_#000] cursor-pointer"
            >
              REMOVE ASSET [X]
            </button>
          </div>
        ))}
      </div>

      {/* 3. GALLERY ARTWORK DIALOG */}
      <AnimatePresence>
        {galleryForm && (
          <div className="fixed inset-0 z-[10200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setGalleryForm(null)} />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border-[4px] border-black p-6 sm:p-8 max-w-md w-full relative shadow-[10px_10px_0_#000] z-20"
            >
              <button
                onClick={() => setGalleryForm(null)}
                className="absolute top-4 right-4 font-mono font-bold text-red-600 border border-red-300 bg-red-50 text-xs px-2 py-0.5 cursor-pointer"
              >
                [X]
              </button>

              <h3 className="font-bangers text-2xl tracking-widest mb-6 text-black">
                ADD NEW GRAPHICS PACKET
              </h3>

              <form onSubmit={dispatchGallerySave} className="space-y-4 font-mono text-xs text-black">
                <div>
                  <label className="font-bold text-black/50 block mb-1">TITLE</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full p-2 border-2 border-black bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">VISUAL CATEGORY TAG</label>
                  <select
                    value={galleryForm.tag}
                    onChange={(e) => setGalleryForm({ ...galleryForm, tag: e.target.value })}
                    className="w-full p-2 border-2 border-black bg-white text-black"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Photography">Photography</option>
                    <option value="UI/UX Prototype">UI/UX Prototype</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">IMAGE URL LINK</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.imageUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                    className="w-full p-2 border-2 border-black bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">ASSET DESCRIPTION</label>
                  <textarea
                    rows={3}
                    required
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className="w-full p-2 border-2 border-black resize-none bg-stone-50"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full font-mono text-xs font-bold uppercase tracking-widest bg-black text-[#FFE03A] border-2 border-black py-3 hover:bg-stone-200 hover:text-black transition-all cursor-pointer shadow-[3px_3px_0_#FFF]"
                  >
                    PLANT GRAPHIC ASSET Node &rarr;
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
