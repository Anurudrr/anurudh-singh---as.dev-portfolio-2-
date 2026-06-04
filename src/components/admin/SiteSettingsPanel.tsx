import React, { useEffect } from "react";

interface SiteSettingsPanelProps {
  siteSettings: any;
  settingsForm: any | null;
  setSettingsForm: (form: any | null) => void;
  dispatchSettingsSave: (e: React.FormEvent) => void;
}

export default function SiteSettingsPanel({
  siteSettings,
  settingsForm,
  setSettingsForm,
  dispatchSettingsSave
}: SiteSettingsPanelProps) {
  // Initialize form if not already set or updated
  useEffect(() => {
    if (!settingsForm && siteSettings) {
      setSettingsForm(siteSettings);
    }
  }, [siteSettings, settingsForm, setSettingsForm]);

  const formValue = settingsForm || siteSettings || {};

  return (
    <div>
      <h3 className="font-bebas text-2xl tracking-wider text-black border-b border-black/15 pb-4 mb-6">
        METABOLIC CONFIGURATION CONFIG (SEO &amp; SOCIO-LINKS)
      </h3>

      <form onSubmit={dispatchSettingsSave} className="space-y-6 font-mono text-xs text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bebas text-lg text-[#E8281A] tracking-wider mb-2 select-none">
              SEO META ATTRIBUTES
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] block font-bold mb-1 uppercase text-black/50">SEO Site Title</label>
                <input
                  type="text"
                  value={formValue.seo?.title || "Anurudh Singh — AS.DEV Portfolio"}
                  onChange={(e) =>
                    setSettingsForm({
                      ...formValue,
                      seo: { ...formValue.seo, title: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-stone-50 text-black"
                />
              </div>
              <div>
                <label className="text-[10px] block font-bold mb-1 uppercase text-black/50">SEO Description</label>
                <textarea
                  rows={2}
                  value={formValue.seo?.description || "B.Tech Student & Systems Engineer."}
                  onChange={(e) =>
                    setSettingsForm({
                      ...formValue,
                      seo: { ...formValue.seo, description: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-stone-50 resize-none text-black"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bebas text-lg text-[#1A5CE8] tracking-wider mb-2 select-none">
              SOCIAL METRIC HIGH-PORTS
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] block font-bold mb-1 uppercase text-black/50">GitHub URL</label>
                <input
                  type="text"
                  value={formValue.socialLinks?.github || "https://github.com/Anurudrr"}
                  onChange={(e) =>
                    setSettingsForm({
                      ...formValue,
                      socialLinks: { ...formValue.socialLinks, github: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-stone-50 text-black"
                />
              </div>
              <div>
                <label className="text-[10px] block font-bold mb-1 uppercase text-black/50">LeetCode Profile Link</label>
                <input
                  type="text"
                  value={formValue.socialLinks?.leetcode || "https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/"}
                  onChange={(e) =>
                    setSettingsForm({
                      ...formValue,
                      socialLinks: { ...formValue.socialLinks, leetcode: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-stone-50 text-black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/15 pt-5 flex justify-end">
          <button
            type="submit"
            className="font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border-2 border-black bg-black text-[#FFE03A] shadow-[3px_3px_0_#FFE03A] hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
          >
            SYNC PREFERENCES &infin;
          </button>
        </div>
      </form>
    </div>
  );
}
