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
    <div className='file'>
      <Link href={`/docs/${file.id}`}>
        <a className={styles.label}>{file.matter.title}</a>
      </Link>
    </div>
  );
}

function Folder({ folder, children }) {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = e => {
  //   e.preventDefault();
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className={styles.folder}>
      <Link href={`/docs/${folder.id}`}>
        <a className={styles.folderLabel}>{folder.matter.title}</a>
      </Link>
      {/* <Collapsible isOpen={isOpen}> */}
      <div className={styles.folderContents}>{children}</div>
      {/* </Collapsible> */}
    </div>
  );
}

const TreeRecursive = ({ data }) => {
  return data.map((item) => {
    if (item.type === 'file') {
      return <File file={item} />;
    }

    if (item.type === 'folder') {
      return (
        <Folder folder={item}>
          <TreeRecursive data={item.files} />
        </Folder>
      );
    }
  });
};
