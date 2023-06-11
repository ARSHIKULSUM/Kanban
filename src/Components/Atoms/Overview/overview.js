import Styles from './overview.module.css';
import { MdDescription, MdComment, MdPlaylistAddCheck } from 'react-icons/md';

export default function Overview({ taskName, cardTitle }) {
  return (
    <div className={Styles.outer}>
      <div className={Styles.header}>
        <MdPlaylistAddCheck className={Styles.icon} />
        <h3>{taskName}</h3>
        <span className={Styles.cardTitle}>in the {cardTitle}</span>
      </div>
      <div className={Styles.section}>
        <MdDescription className={Styles.icon} />
        <div className={Styles.field}>
          <h4>Description</h4>
          <textarea placeholder="Add description..." />
        </div>
      </div>
      <div className={Styles.section}>
        <MdComment className={Styles.icon} />
        <div className={Styles.field}>
          <h4>Comment</h4>
          <textarea placeholder="Add comment..." />
        </div>
      </div>
      </div>
  );
}