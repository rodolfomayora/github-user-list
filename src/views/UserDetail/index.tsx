import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Layout,
  Container,
  PictureProfile,
  BackButton,
  Modal,
  SecureExternalLink,
  RepositoryListItem,
  RepositoryInfo
} from '../../components';
import { userInfo, userRepositories } from '../../utils/userSampleData';
import styles from './styles.module.scss';

const UserDetail: FC = () => {

  const { userName } = useParams<any>();
  
  // const redirectPage = useHistory().push;

  // useEffect(() => {
  //   if () redirectPage('/404');
  // },
  // [])

  const parseData: any = { ...userInfo };
  const allRepos: any = [...userRepositories];

  const [selectedRepository, setSelectedRepository] = useState<object | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClickItemList = (repositoryObject: object) => () => {
    setSelectedRepository(repositoryObject);
    setShowModal(true);
  }

  const onClickCloseModal = () => {
    setSelectedRepository(null);
    setShowModal(false);
  }

  const noHasDataMessage: string = 'Does not have';

  return (
    <Layout>
      <main className={styles.UserDetail}>
        <Container>
          <BackButton
              path="/"
              label="Back to List"
          />

          <section className={styles.generalInfo}>
            <div className={styles.pictureWrapper}>
              <div className={styles.middleLayer}>
                <div className={styles.helperLayer} />
                <div className={styles.shadowLayer}>
                  <PictureProfile
                    userName={userName}
                    src={parseData.avatar_url}
                  />
                </div>
              </div>
            </div>

            <h2 className={styles.subtitle}>{parseData.name}</h2>

            <div className={styles.infoWapper}>
              <p>
                <span className={styles.labelInfo}>User name: </span>
                {parseData.login}
              </p>
              <p>
                <span className={styles.labelInfo}>Email: </span>
                {parseData.email ?? 'Not available'}
              </p>
              <p>
                <span className={styles.labelInfo}>Biography: </span>
                {parseData?.bio  ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Location: </span>
                {parseData?.location ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Company: </span>
                {parseData?.company ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>{'Blog: '}</span>
                {parseData?.blog 
                ? <SecureExternalLink path={parseData.blog}/> 
                : noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>{'Github profile: '}</span>
                {parseData?.html_url
                ? <SecureExternalLink path={parseData.html_url}/>
                : noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Twitter username: </span>
                {parseData?.twitter_username ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Repositories: </span>
                {parseData?.public_repos ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Followers: </span>
                {parseData?.followers ?? noHasDataMessage}
              </p>
              <p>
                <span className={styles.labelInfo}>Following: </span>
                {parseData?.following ?? noHasDataMessage}
              </p>
            </div>
          </section>

          <section>
            <h2 className={styles.subtitle}>Repositories</h2>

            <ul className={styles.repoList}>
            {!!allRepos.length && allRepos.map((repo: any) => (
              <RepositoryListItem key={repo.id}
                name={repo.name}
                mainLanguaje={repo.language}
                onClickAction={onClickItemList(repo)}
              />
            ))}
            </ul>
          </section>
        </Container>
      </main>

      {showModal && (
        <Modal closeModal={onClickCloseModal}>
          <RepositoryInfo repoInfo={selectedRepository} />
        </Modal>
      )}
    </Layout>
  )
}

export default UserDetail;