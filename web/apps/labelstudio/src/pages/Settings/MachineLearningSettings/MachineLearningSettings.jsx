import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Spinner } from "../../../components";
import { Description } from "../../../components/Description/Description";
import { Form, Label, Toggle } from "../../../components/Form";
import { modal } from "../../../components/Modal/Modal";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { IconModels } from "@humansignal/icons";
import { useAPI } from "../../../providers/ApiProvider";
import { ProjectContext } from "../../../providers/ProjectProvider";
import { MachineLearningList } from "./MachineLearningList";
import { CustomBackendForm } from "./Forms";
import { TestRequest } from "./TestRequest";
import { StartModelTraining } from "./StartModelTraining";
import { Block, Elem } from "../../../utils/bem";
import { useTranslation } from "react-i18next";
import "./MachineLearningSettings.scss";

export const MachineLearningSettings = () => {
  const { t } = useTranslation();
  const api = useAPI();
  const { project, fetchProject } = useContext(ProjectContext);
  const [backends, setBackends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const fetchBackends = useCallback(async () => {
    setLoading(true);
    const models = await api.callApi("mlBackends", {
      params: {
        project: project.id,
        include_static: true,
      },
    });

    if (models) setBackends(models);
    setLoading(false);
    setLoaded(true);
  }, [project, setBackends]);

  const startTrainingModal = useCallback(
    (backend) => {
      const modalProps = {
        title: "Start Model Training",
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <StartModelTraining backend={backend} />,
      };

      modal(modalProps);
    },
    [project],
  );

  const showRequestModal = useCallback(
    (backend) => {
      const modalProps = {
        title: "Test Request",
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <TestRequest backend={backend} />,
      };

      modal(modalProps);
    },
    [project],
  );

  const showMLFormModal = useCallback(
    (backend) => {
      const action = backend ? "updateMLBackend" : "addMLBackend";
      const modalProps = {
        title: `${backend ? "Edit" : "Connect"} Model`,
        style: { width: 760 },
        closeOnClickOutside: false,
        body: (
          <CustomBackendForm
            action={action}
            backend={backend}
            project={project}
            onSubmit={() => {
              fetchBackends();
              modalRef.close();
            }}
          />
        ),
      };

      const modalRef = modal(modalProps);
    },
    [project, fetchBackends],
  );

  useEffect(() => {
    if (project.id) {
      fetchBackends();
    }
  }, [project.id]);

  return (
    <Block name="ml-settings">
      <Elem name={"wrapper"}>
        <h1>{t('settings.ml.title')}</h1>
        <Description>{t('settings.ml.description')}</Description>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <Spinner size={32} />
          </div>
        ) : backends.length === 0 ? (
          <EmptyState
            icon={<IconModels />}
            title={t('settings.ml.empty.title')}
            description={t('settings.ml.empty.description')}
            button={
              <Button look="primary" onClick={() => showMLFormModal()}>
                {t('settings.ml.empty.addButton')}
              </Button>
            }
          />
        ) : (
          <MachineLearningList
            onEdit={(backend) => showMLFormModal(backend)}
            onTestRequest={(backend) => showRequestModal(backend)}
            onStartTraining={(backend) => startTrainingModal(backend)}
            fetchBackends={fetchBackends}
            backends={backends}
          />
        )}

        {backends.length > 0 && (
          <>
            <Description>
              {t('settings.ml.connectedModel.description')}
              <br />
              <br />
              1. {t('settings.ml.connectedModel.step1')}<br />
              2. {t('settings.ml.connectedModel.step2')}
              <br />
              3. {t('settings.ml.connectedModel.step3')}
            </Description>
            <Description>
              {t('settings.ml.prelabeling.description')}{" "}
              <NavLink to="annotation">{t('settings.ml.prelabeling.link')}</NavLink>.
            </Description>
          </>
        )}

        <Form
          action="updateProject"
          formData={{ ...project }}
          params={{ pk: project.id }}
          onSubmit={() => fetchProject()}
        >
          {backends.length > 0 && (
            <Form.Row columnCount={1}>
              <Label text={t('settings.ml.configuration')} large />

              <div>
                <Toggle
                  label={t('settings.ml.training.label')}
                  description={t('settings.ml.training.description')}
                  name="start_training_on_annotation_update"
                />
              </div>
            </Form.Row>
          )}

          {backends.length > 0 && (
            <Form.Actions>
              <Form.Indicator>
                <span case="success">{t('common.saved')}</span>
              </Form.Indicator>
              <Button type="submit" look="primary" style={{ width: 120 }}>
                {t('common.save')}
              </Button>
            </Form.Actions>
          )}
        </Form>
      </Elem>
    </Block>
  );
};

MachineLearningSettings.title = "机器学习模型";
MachineLearningSettings.path = "/ml";
