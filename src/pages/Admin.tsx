import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Check, Image, Loader2, MessageSquare, Package, Plus, Trash2, Upload, UtensilsCrossed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Tab = "menu" | "orders" | "messages";

interface MenuItemRow {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_available: boolean;
}

interface OrderRow {
  id: string;
  branch: string;
  status: string;
  total: number;
  notes: string | null;
  created_at: string;
  user_id: string;
}

interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");
  const [menuItems, setMenuItems] = useState<MenuItemRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(false);

  // New menu item form
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formImage, setFormImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("menu-images").upload(fileName, file);
    if (error) {
      toast.error("Image upload failed");
      return null;
    }
    const { data: urlData } = supabase.storage.from("menu-images").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFormImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setFormImage(url);
    setUploading(false);
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditingImageId(itemId);
    const url = await uploadImage(file);
    if (url) {
      const { error } = await supabase.from("menu_items").update({ image_url: url }).eq("id", itemId);
      if (error) toast.error("Failed to update image");
      else { toast.success("Image updated!"); fetchData(); }
    }
    setEditingImageId(null);
  };

  const fetchData = async () => {
    setLoading(true);
    if (tab === "menu") {
      const { data } = await supabase.from("menu_items").select("*").order("category").order("name");
      setMenuItems(data || []);
    } else if (tab === "orders") {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      setOrders(data || []);
    } else {
      const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [tab, isAdmin]);

  if (authLoading) return <div className="container mx-auto p-10 text-center text-muted-foreground font-body">Loading...</div>;
  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto p-10 text-center">
        <p className="text-destructive font-body font-bold text-xl">Access Denied</p>
        <p className="text-muted-foreground font-body mt-2">You need admin privileges to access this page.</p>
      </div>
    );
  }

  const addMenuItem = async () => {
    if (!formName || !formPrice || !formCategory) {
      toast.error("Name, price, and category are required");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("menu_items").insert({
      name: formName.trim(),
      description: formDesc.trim() || null,
      price: parseFloat(formPrice),
      category: formCategory.trim(),
      image_url: formImage.trim() || null,
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to add item");
    } else {
      toast.success("Menu item added!");
      setFormName(""); setFormDesc(""); setFormPrice(""); setFormCategory(""); setFormImage("");
      setShowForm(false);
      fetchData();
    }
  };

  const deleteMenuItem = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) toast.error("Failed to delete"); else { toast.success("Deleted"); fetchData(); }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await supabase.from("menu_items").update({ is_available: !current }).eq("id", id);
    fetchData();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    toast.success(`Order ${status}`);
    fetchData();
  };

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    fetchData();
  };

  const tabs = [
    { key: "orders" as Tab, label: "Orders", icon: Package },
    { key: "menu" as Tab, label: "Menu", icon: UtensilsCrossed },
    { key: "messages" as Tab, label: "Messages", icon: MessageSquare },
  ];

  const inputClass = "w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-fire transition-all";

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-display font-bold text-foreground mb-8">
        Admin <span className="text-gradient-fire">Panel</span>
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-bold text-sm transition-all ${
              tab === key ? "bg-gradient-fire text-primary-foreground shadow-fire" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* ORDERS TAB */}
          {tab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-muted-foreground font-body text-center py-10">No orders yet.</p>
              ) : orders.map((o) => (
                <motion.div key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body font-bold text-foreground">#{o.id.slice(0, 8)}</p>
                    <span className="text-xs text-muted-foreground font-body">
                      {new Date(o.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{o.branch} • Rs. {o.total}</p>
                  {o.notes && <p className="text-xs text-muted-foreground font-body mt-1 italic">{o.notes}</p>}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["confirmed", "preparing", "delivered", "cancelled"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateOrderStatus(o.id, s)}
                        disabled={o.status === s}
                        className={`px-3 py-1 rounded-lg text-xs font-bold font-body capitalize transition-all ${
                          o.status === s ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* MENU TAB */}
          {tab === "menu" && (
            <div>
              <button onClick={() => setShowForm(!showForm)} className="mb-6 flex items-center gap-2 bg-gradient-fire text-primary-foreground px-5 py-2.5 rounded-xl font-bold font-body hover:shadow-fire transition-all">
                <Plus className="w-4 h-4" /> Add Menu Item
              </button>

              {showForm && (
                <div className="glass-card rounded-xl p-6 mb-6 space-y-3">
                  <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Item name" className={inputClass} maxLength={100} />
                  <input value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description" className={inputClass} maxLength={300} />
                  <input value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="Price (e.g. 750)" type="number" className={inputClass} />
                  <input value={formCategory} onChange={(e) => setFormCategory(e.target.value)} placeholder="Category" className={inputClass} maxLength={50} />
                  <div className="flex items-center gap-3">
                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFormImageUpload} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border bg-secondary text-muted-foreground font-body hover:border-primary hover:text-foreground transition-all disabled:opacity-50">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </button>
                    {formImage && <img src={formImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />}
                  </div>
                  <button onClick={addMenuItem} disabled={saving} className="bg-gradient-fire text-primary-foreground px-6 py-2.5 rounded-xl font-bold font-body disabled:opacity-50 flex items-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
                  </button>
                </div>
              )}

              <input type="file" ref={editFileInputRef} accept="image/*" className="hidden" onChange={(e) => editingImageId && handleEditImageUpload(e, editingImageId)} />
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                    <div className="relative group flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                          <Image className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <button
                        onClick={() => { setEditingImageId(item.id); editFileInputRef.current?.click(); }}
                        disabled={editingImageId === item.id}
                        className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        {editingImageId === item.id ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Upload className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{item.category} • Rs. {item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleAvailability(item.id, item.is_available)} className={`px-3 py-1 rounded-lg text-xs font-bold font-body ${item.is_available ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>
                        {item.is_available ? "Available" : "Unavailable"}
                      </button>
                      <button onClick={() => deleteMenuItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {tab === "messages" && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-muted-foreground font-body text-center py-10">No messages yet.</p>
              ) : messages.map((m) => (
                <div key={m.id} className={`glass-card rounded-xl p-5 ${!m.is_read ? "border border-primary/30" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body font-bold text-foreground">{m.name}</p>
                    <span className="text-xs text-muted-foreground font-body">{new Date(m.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{m.email}{m.phone && ` • ${m.phone}`}</p>
                  <p className="text-foreground font-body mt-2">{m.message}</p>
                  {!m.is_read && (
                    <button onClick={() => markRead(m.id)} className="mt-3 flex items-center gap-1 text-xs text-primary font-body font-bold hover:underline">
                      <Check className="w-3 h-3" /> Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
