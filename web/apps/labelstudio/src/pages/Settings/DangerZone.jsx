import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Form';
import { ProjectProvider } from '../../providers/ProjectProvider';
import { cn } from "../../utils/bem";

const DangerZone = () => {
  const { t } = useTranslation();
  const { project, fetchProject } = useContext(ProjectProvider);
  const [loading, setLoading] = useState(false);

  const deleteProject = useCallback(async () => {
    if (!project) return;
    setLoading(true);
    try {
      await project.destroy();
      window.location.href = '/projects/';
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [project]);

  const resetProject = useCallback(async () => {
    if (!project) return;
    setLoading(true);
    try {
      await project.reset();
      await fetchProject(project.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [project, fetchProject]);

  if (!project) return null;

  return (
    <div className={cn("simple-settings")}>
      <h1>{t('settings.dangerZone.title')}</h1>
      <Label description={t('settings.dangerZone.description')} />

      <div style={{ marginTop: 16 }}>
        <Button
          type="button"
          onClick={deleteProject}
          loading={loading}
          danger
        >
          {t('settings.dangerZone.delete')}
        </Button>
        <Button
          type="button"
          onClick={resetProject}
          loading={loading}
          danger
        >
          {t('settings.dangerZone.reset')}
        </Button>
      </div>

      <div className="danger-zone-help">
        <p>{t('settings.dangerZone.deleteHelp')}</p>
        <p>{t('settings.dangerZone.resetHelp')}</p>
      </div>
    </div>
  );
};

// Static properties
DangerZone.title = '危险地带';
DangerZone.path = "/danger-zone";

export default DangerZone;


