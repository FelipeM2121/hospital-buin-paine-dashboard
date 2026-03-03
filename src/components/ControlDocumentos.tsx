import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen, Search, X } from 'lucide-react';
import './ControlDocumentos.css';

interface DocumentItem {
  nivel: number;
  carpetaPadre: string | null;
  nombre: string;
  tipo: 'Carpeta' | 'Archivo';
  rutaRelativa: string;
}

interface TreeNode extends DocumentItem {
  children?: TreeNode[];
}

export const ControlDocumentos: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTree, setFilteredTree] = useState<TreeNode[]>([]);
  const [stats, setStats] = useState({ carpetas: 0, archivos: 0 });

  useEffect(() => {
    const cargarDocumentos = async () => {
      try {
        const response = await fetch('/documentos-data.json');
        const datos: DocumentItem[] = await response.json();
        const tree = buildTreeStructure(datos);
        setTreeData(tree);
        setFilteredTree(tree);

        let carpetas = 0, archivos = 0;
        datos.forEach(item => {
          if (item.tipo === 'Carpeta') carpetas++;
          else archivos++;
        });
        setStats({ carpetas, archivos });
        setExpandedNodes(new Set(tree.map(n => n.nombre)));
      } catch (error) {
        console.error('Error cargando documentos:', error);
      }
    };
    cargarDocumentos();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTree(treeData);
      return;
    }

    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter((node) => node.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((node) => ({
          ...node,
          children: node.children ? filterNodes(node.children) : [],
        }))
        .filter((node) => node.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || (node.children && node.children.length > 0));
    };

    setFilteredTree(filterNodes(treeData));
    const allMatching = new Set<string>();
    const collectMatching = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
          allMatching.add(node.nombre);
        }
        if (node.children) collectMatching(node.children);
      });
    };
    collectMatching(treeData);
    setExpandedNodes(allMatching);
  }, [searchTerm, treeData]);

  const buildTreeStructure = (items: DocumentItem[]): TreeNode[] => {
    const sorted = [...items].sort((a, b) => a.nivel - b.nivel);
    const root: TreeNode[] = [];
    const map = new Map<string, TreeNode>();

    sorted.forEach((item) => {
      const node: TreeNode = { ...item, children: [] };

      if (item.nivel === 0) {
        root.push(node);
      } else if (item.carpetaPadre) {
        const parent = map.get(item.carpetaPadre);
        if (parent && parent.children) {
          parent.children.push(node);
        }
      }
      map.set(item.nombre, node);
    });

    return root;
  };

  const toggleExpand = (nodeName: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeName)) {
      newExpanded.delete(nodeName);
    } else {
      newExpanded.add(nodeName);
    }
    setExpandedNodes(newExpanded);
  };

  const TreeNodeComponent: React.FC<{ node: TreeNode; depth: number }> = ({
    node,
    depth,
  }) => {
    const isExpanded = expandedNodes.has(node.nombre);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.nombre} className="tree-node">
        <div className="tree-node-content" style={{ paddingLeft: `${depth * 16}px` }}>
          {node.tipo === 'Carpeta' && hasChildren ? (
            <button
              className="expand-button"
              onClick={() => toggleExpand(node.nombre)}
              aria-label={isExpanded ? 'Contraer' : 'Expandir'}
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
          ) : (
            <div className="expand-button-placeholder" />
          )}

          {node.tipo === 'Carpeta' ? (
            isExpanded ? (
              <FolderOpen size={20} className="folder-open-icon" />
            ) : (
              <Folder size={20} className="folder-icon" />
            )
          ) : (
            <FileText size={20} className="file-icon" />
          )}

          <span className="node-label">{node.nombre}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="tree-children">
            {node.children!.map((child) => (
              <TreeNodeComponent key={child.nombre} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="control-documentos">
      <div className="control-documentos-header">
        <h2>📄 Documentos</h2>
        <p className="subtitle">Mobiliario No Clínico</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-info">
            <div className="stat-number">{stats.carpetas}</div>
            <div className="stat-label">Carpetas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <div className="stat-number">{stats.archivos}</div>
            <div className="stat-label">Archivos</div>
          </div>
        </div>
      </div>

      <div className="search-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="clear-button" aria-label="Limpiar">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="control-documentos-content">
        <div className="tree-view">
          {filteredTree.length > 0 ? (
            filteredTree.map((node) => (
              <TreeNodeComponent key={node.nombre} node={node} depth={0} />
            ))
          ) : (
            <div className="no-results">
              <p>No encontrado</p>
              <button onClick={() => setSearchTerm('')} className="reset-button">
                Limpiar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="footer-info">
        Hospital Buin Paine
      </div>
    </div>
  );
};