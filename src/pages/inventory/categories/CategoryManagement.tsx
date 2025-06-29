import React, { useState, useEffect } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2, ChevronRight, FolderPlus, Search, X, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export interface Category {
  id: string;
  name: string;
  children: Category[];
}

const initialCategories: Category[] = [
  {
    id: "medicines",
    name: "Medicines",
    children: [
      { id: "prescription-drugs", name: "Prescription Drugs" },
      { id: "otc-medications", name: "OTC Medications" },
      { id: "supplements", name: "Supplements" },
    ],
  },
  {
    id: "beauty-products",
    name: "Beauty Products",
    children: [
      { id: "skincare", name: "Skincare Items" },
      { id: "cosmetics", name: "Cosmetics" },
      { id: "hair-care", name: "Hair Care Products" },
    ],
  },
  {
    id: "medical-equipment",
    name: "Medical Equipment",
    children: [
      { id: "consumables", name: "Consumables" },
      { id: "instruments", name: "Instruments" },
      { id: "machines-devices", name: "Machines/Devices" },
    ],
  },
  {
    id: "clinic-supplies",
    name: "Clinic Supplies",
    children: [
      { id: "administrative", name: "Administrative Supplies" },
      { id: "cleaning", name: "Cleaning Products" },
      { id: "safety", name: "Safety Equipment" },
    ],
  },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);
  const [dialogParentId, setDialogParentId] = useState<string | null>(null);
  const [dialogCategoryId, setDialogCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const openAddDialog = (parentId: string) => {
    setDialogParentId(parentId);
    setDialogType("add");
    setNewCategoryName("");
    setDialogOpen(true);
  };

  const openEditDialog = (id: string, currentName: string) => {
    setDialogCategoryId(id);
    setDialogType("edit");
    setNewCategoryName(currentName);
    setDialogOpen(true);
  };

  const addMainCategory = () => {
    if (!newCategoryName) return;
    const id = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    setCategories([...categories, { id, name: newCategoryName, children: [] }]);
    setDialogOpen(false);
  };

  const addSubCategory = () => {
    if (!newCategoryName || !dialogParentId) return;
    const id = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === dialogParentId
          ? {
              ...cat,
              children: [...(cat.children || []), { id, name: newCategoryName }],
            }
          : cat
      )
    );
    setDialogOpen(false);
  };

  const editCategory = () => {
    if (!newCategoryName || !dialogCategoryId) return;
    
    const update = (cats: Category[]): Category[] =>
      cats.map((c) =>
        c.id === dialogCategoryId
          ? { ...c, name: newCategoryName }
          : { ...c, children: c.children ? update(c.children) : undefined }
      );
      
    setCategories(update);
    setDialogOpen(false);
  };

  const deleteCategory = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    const remove = (cats: Category[]): Category[] =>
      cats.filter((c) => c.id !== id).map((c) => ({ 
        ...c, 
        children: c.children ? remove(c.children) : undefined 
      }));
      
    setCategories(remove);
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dialogType === "add") {
      if (dialogParentId) {
        addSubCategory();
      } else {
        addMainCategory();
      }
    } else if (dialogType === "edit") {
      editCategory();
    }
  };

  const renderCategoryCard = (category: Category) => {
    const isSelected = selectedCategory === category.id;
    const hasChildren = category.children && category.children.length > 0;
    
    return (
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          className={`mb-4 ${isSelected ? 'border-primary shadow-md' : 'hover:border-primary/30'} 
          transition-all duration-200 mt-4 overflow-hidden`}
        >
          <CardHeader className={`pb-2 ${isSelected ? 'bg-primary/5' : 'bg-muted/5'}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                {hasChildren && (
                  <Badge variant="outline" className="text-xs">
                    {category.children.length} {category.children.length === 1 ? 'subcategory' : 'subcategories'}
                  </Badge>
                )}
              </div>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary" 
                        onClick={() => openAddDialog(category.id)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Subcategory</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary" 
                        onClick={() => openEditDialog(category.id, category.name)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {hasChildren && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 hover:bg-primary/5" 
                    onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                  >
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} 
                    />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <AnimatePresence>
            {isSelected && hasChildren && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4">
                  <div className="pl-4 border-l-2 border-primary/20 mt-2 space-y-2">
                    {category.children.map(renderCategoryCard)}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
  
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    const filterCategories = (cats: Category[]): Category[] => {
      return cats.filter(cat => {
        const nameMatch = cat.name.toLowerCase().includes(searchLower);
        const childMatches = cat.children ? filterCategories(cat.children) : [];
        
        if (nameMatch) return true;
        if (childMatches.length > 0) {
          cat.children = childMatches;
          return true;
        }
        return false;
      });
    };
    
    setFilteredCategories(filterCategories([...categories]));
  }, [searchTerm, categories]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Product Categories" />
        <main className="flex-1 p-6 overflow-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-card rounded-lg p-6 shadow-sm border mt-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Category Management</h2>
              <Button 
                onClick={() => { setDialogParentId(null); openAddDialog(""); }}
                className="bg-primary hover:bg-primary/90 shadow-sm"
              >
                <FolderPlus className="mr-2 h-4 w-4" /> Add Main Category
              </Button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {filteredCategories.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 bg-muted/10 rounded-lg border border-dashed border-muted"
              >
                {searchTerm ? (
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No categories found matching '{searchTerm}'</p>
                    <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>Clear Search</Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No categories found. Create your first category to get started.</p>
                )}
              </motion.div>
            ) : (
              <div className="space-y-2">
                {filteredCategories.map(renderCategoryCard)}
              </div>
            )}
          </motion.div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {dialogType === "add" 
                    ? (dialogParentId ? (
                        <>
                          <PlusCircle className="h-5 w-5 text-primary" />
                          Add Subcategory
                          <Badge variant="outline" className="ml-2">
                            {categories.find(c => c.id === dialogParentId)?.name}
                          </Badge>
                        </>
                      ) : (
                        <>
                          <FolderPlus className="h-5 w-5 text-primary" />
                          Add Main Category
                        </>
                      ))
                    : (
                      <>
                        <Edit className="h-5 w-5 text-primary" />
                        Edit Category
                      </>
                    )}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleDialogSubmit}>
                <div className="py-4">
                  <Input
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  {dialogType === "add" && dialogParentId && (
                    <p className="text-sm text-muted-foreground mt-2">
                      This will create a subcategory under "{categories.find(c => c.id === dialogParentId)?.name}"
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!newCategoryName.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {dialogType === "add" ? "Add Category" : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default CategoryManagement;
