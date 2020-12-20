import React from 'react';
import Link from 'next/link';
import styles from './nestedList.module.scss';

export default function NestedList({ dirData }) {
  return (
    <div>
      <TreeRecursive data={[dirData]} />
    </div>
  );
}

function File({ file }) {
  return (
    <div className={styles.file}>
      <Link href={`/docs/${file.id}`}>
        <a className={styles.label}>
          {file.matter.title}{' '}
          <div className={styles.slugpath}>{`/docs/${file.id}`}</div>
        </a>
      </Link>
    </div>
  );
}

function Folder({ folder, children }) {
  return (
    <div className={styles.folder}>
      <Link href={`/docs/${folder.id}`}>
        <a className={styles.folderLabel}>
          {folder.matter.title}{' '}
          <div className={styles.slugpath}>{`/docs/${folder.id}`}</div>
        </a>
      </Link>
      <div className={styles.folderContents}>{children}</div>
    </div>
  );
}

const TreeRecursive = ({ data }) => {
  return data.map((item) => {
    if (item.type === 'file') {
      return <File file={item} key={`item-/docs/${item.id}`} />;
    }

    if (item.type === 'folder') {
      return (
        <Folder folder={item} key={`item-/docs/${item.id}`}>
          <TreeRecursive data={item.files} />
        </Folder>
      );
    }
  });
};
