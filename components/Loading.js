import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

import Styles from "../styles/Components/Loading.module.scss"

export default function Loading() {
  return (
    <div className={Styles.loading}>
      <FontAwesomeIcon icon={faAsterisk} className={Styles.loadingIcon} size="5x" spin/>
    </div>
  );
}
