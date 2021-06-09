import { FC, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  BackButton,
  Container,
  Layout,
  Loader,
  Modal,
  PictureProfile,
  RepositoryInfo,
  RepositoryListItem,
  SecureExternalLink,
} from '../../components';
import { fetchUserData } from '../../utils/fetchData'; 
import styles from './styles.module.scss';

const UserDetail: FC = () => {

  const { userName } = useParams<any>();
  const redirectPage = useHistory().push;
  const noHasDataMessage: string = 'Does not have';
  const [userData, setUserData] = useState<any | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  useEffect(() => {

    let didCancel: boolean = false;

    const getData = async () => {
      try {
        const data: object = await fetchUserData(userName);
        if (!didCancel) {
          setShowLoader(false);
          setUserData({ ...data });
        }
      } catch (error) {
        console.clear();
        console.error(error);
        setShowLoader(false);
        redirectPage('/404');
      }
    }

    getData();

    return () => {
      didCancel = true;
    }
  },
  [userName, redirectPage])

  const [selectedRepository, setSelectedRepository] = useState<object | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClickItemList = (repositoryObject: object) => () => {
    setSelectedRepository(repositoryObject);
    setShowModal(true);
  }

  const onClickCloseModal = (): void => {
    setSelectedRepository(null);
    setShowModal(false);
  }

  return (
    <Layout>
      <main className={styles.UserDetail}>
        <Container>
          <BackButton
              path="/"
              label="Back to List"
          />

          {showLoader && (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          )}

          {!!userData && (
            <section className={styles.generalInfo}>
              <div className={styles.pictureWrapper}>
                <div className={styles.middleLayer}>
                  <div className={styles.helperLayer} />
                  <div className={styles.shadowLayer}>
                    <PictureProfile
                      userName={userName}
                      src={userData.avatar_url}
                    />
                  </div>
                </div>
              </div>

              <h2 className={styles.subtitle}>{userData.name}</h2>

              <div className={styles.infoWapper}>
                <p>
                  <span className={styles.labelInfo}>User name: </span>
                  {userData.login}
                </p>
                <p>
                  <span className={styles.labelInfo}>Email: </span>
                  {userData.email ?? 'Not available'}
                </p>
                <p>
                  <span className={styles.labelInfo}>Biography: </span>
                  {userData?.bio  ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Location: </span>
                  {userData?.location ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Company: </span>
                  {userData?.company ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>{'Blog: '}</span>
                  {userData?.blog 
                  ? <SecureExternalLink path={userData.blog}/> 
                  : noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>{'Github profile: '}</span>
                  {userData?.html_url
                  ? <SecureExternalLink path={userData.html_url}/>
                  : noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Twitter username: </span>
                  {userData?.twitter_username ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Repositories: </span>
                  {userData?.public_repos ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Followers: </span>
                  {userData?.followers ?? noHasDataMessage}
                </p>
                <p>
                  <span className={styles.labelInfo}>Following: </span>
                  {userData?.following ?? noHasDataMessage}
                </p>
              </div>
            </section>
          )}

          {!!userData && (
            <section>
              <h2 className={styles.subtitle}>Repositories</h2>

              <ul className={styles.repoList}>
              {userData.allRepositories?.map((repo: any) => (
                <RepositoryListItem key={repo.id}
                  name={repo.name}
                  mainLanguaje={repo.language}
                  onClickAction={onClickItemList(repo)}
                />
              ))}
              </ul>
            </section>
          )}
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