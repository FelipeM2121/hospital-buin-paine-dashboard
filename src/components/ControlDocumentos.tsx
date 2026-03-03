import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';
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

  useEffect(() => {
    const cargarDocumentos = async () => {
      try {
        const response = await fetch('/documentos-data.json');
        const datos: DocumentItem[] = await response.json();
        const tree = buildTreeStructure(datos);
        setTreeData(tree);
      } catch (error) {
        console.error('Error cargando documentos:', error);
      }
    };
    cargarDocumentos();
  }, []);

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
        <div className="tree-node-content" style={{ paddingLeft: `${depth * 20}px` }}>
          {node.tipo === 'Carpeta' && hasChildren ? (
            <button className="expand-button" onClick={() => toggleExpand(node.nombre)}>
              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          ) : (
            <div className="expand-button-placeholder" />
          )}

          {node.tipo === 'Carpeta' ? (
            isExpanded ? (
              <FolderOpen size={18} className="folder-open-icon" />
            ) : (
              <Folder size={18} className="folder-icon" />
            )
          ) : (
            <FileText size={18} className="file-icon" />
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
        <h2>Control de Documentos</h2>
        <p className="subtitle">Mobiliario No Clínico - Hospital Buin Paine</p>
      </div>
      <div className="control-documentos-content">
        <div className="tree-view">
          {treeData.map((node) => (
            <TreeNodeComponent key={node.nombre} node={node} depth={0} />
          ))}
        </div>
      </div>
    </div>
  );
};