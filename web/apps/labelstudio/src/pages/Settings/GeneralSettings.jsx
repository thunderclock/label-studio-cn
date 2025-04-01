import { EnterpriseBadge } from "@humansignal/ui";
import { useCallback, useContext } from "react";
import { Button } from "../../components";
import { Form, Input, Select, TextArea } from "../../components/Form";
import { RadioGroup } from "../../components/Form/Elements/RadioGroup/RadioGroup";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Block, Elem } from "../../utils/bem";
import "./settings.scss";
import { HeidiTips } from "../../components/HeidiTips/HeidiTips";
import { FF_LSDV_E_297, isFF } from "../../utils/feature-flags";
import { createURL } from "../../components/HeidiTips/utils";
import { Caption } from "../../components/Caption/Caption";
import { useTranslation } from "react-i18next";

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const { project, fetchProject } = useContext(ProjectContext);

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project]);

  const colors = ["#FDFDFC", "#FF4C25", "#FF750F", "#ECB800", "#9AC422", "#34988D", "#617ADA", "#CC6FBE"];

  const samplings = [
    { value: "Sequential", label: t('settings.general.taskSampling.sequential.label'), description: t('settings.general.taskSampling.sequential.description') },
    { value: "Uniform", label: t('settings.general.taskSampling.uniform.label'), description: t('settings.general.taskSampling.uniform.description') },
  ];

  return (
    <Block name="general-settings">
      <Elem name={"wrapper"}>
        <h1>{t('settings.general.title')}</h1>
        <Block name="settings-wrapper">
          <Form action="updateProject" formData={{ ...project }} params={{ pk: project.id }} onSubmit={updateProject}>
            <Form.Row columnCount={1} rowGap="16px">
              <Input name="title" label={t('settings.general.projectName')} />

              <TextArea name="description" label={t('settings.general.description')} style={{ minHeight: 128 }} />
              {isFF(FF_LSDV_E_297) && (
                <Block name="workspace-placeholder">
                  <Elem name="badge-wrapper">
                    <Elem name="title">{t('settings.general.workspace.title')}</Elem>
                    <EnterpriseBadge className="ml-2" />
                  </Elem>
                  <Select placeholder={t('settings.general.workspace.placeholder')} disabled options={[]} />
                  <Caption>
                    {t('settings.general.workspace.description')}{" "}
                    <a
                      target="_blank"
                      href={createURL(
                        "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
                        {
                          experiment: "project_settings_tip",
                          treatment: "simplify_project_management",
                        },
                      )}
                      rel="noreferrer"
                    >
                      {t('common.learnMore')}
                    </a>
                  </Caption>
                </Block>
              )}
              <RadioGroup name="color" label={t('settings.general.color')} size="large" labelProps={{ size: "large" }}>
                {colors.map((color) => (
                  <RadioGroup.Button key={color} value={color}>
                    <Block name="color" style={{ "--background": color }} />
                  </RadioGroup.Button>
                ))}
              </RadioGroup>

              <RadioGroup label={t('settings.general.taskSampling.title')} labelProps={{ size: "large" }} name="sampling" simple>
                {samplings.map(({ value, label, description }) => (
                  <RadioGroup.Button
                    key={value}
                    value={`${value} sampling`}
                    label={`${label} sampling`}
                    description={description}
                  />
                ))}
                {isFF(FF_LSDV_E_297) && (
                  <RadioGroup.Button
                    key="uncertainty-sampling"
                    value=""
                    label={
                      <>
                        {t('settings.general.taskSampling.uncertainty.label')} <EnterpriseBadge className="ml-2" />
                      </>
                    }
                    disabled
                    description={
                      <>
                        {t('settings.general.taskSampling.uncertainty.description')}{" "}
                        <a
                          target="_blank"
                          href={createURL("https://docs.humansignal.com/guide/active_learning", {
                            experiment: "project_settings_workspace",
                            treatment: "workspaces",
                          })}
                          rel="noreferrer"
                        >
                          {t('common.learnMore')}
                        </a>
                      </>
                    }
                  />
                )}
              </RadioGroup>
            </Form.Row>

            <Form.Actions>
              <Form.Indicator>
                <span case="success">{t('common.saved')}</span>
              </Form.Indicator>
              <Button type="submit" look="primary" style={{ width: 120 }}>
                {t('common.save')}
              </Button>
            </Form.Actions>
          </Form>
        </Block>
      </Elem>
      {isFF(FF_LSDV_E_297) && <HeidiTips collection="projectSettings" />}
    </Block>
  );
};

GeneralSettings.menuItem = "General";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
