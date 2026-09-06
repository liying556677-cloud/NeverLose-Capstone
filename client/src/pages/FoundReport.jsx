import { useParams } from "react-router-dom";
import { useFoundFlow } from "../hooks/public/useFoundFlow";
import Step1ItemPreview from "../components/Found/Step1";
import Step2Verification from "../components/Found/Step2";
import Step3Success from "../components/Found/Step3";
import Founder from "../layouts/Founder/Founder";
import ProgressBar from "../components/progressBar/ProgressBar";
import { publicApi } from "../api/publicApi";
import Step1Img from "../assets/Finder-Step1.webp";
import Step2Img from "../assets/Finder-Step2.webp";
import Step3Img from "../assets/Finder-Step3.webp";
import NotFound from "../components/Found/NotFound";

export default function FoundReport() {
  const { token } = useParams();//Get token from URL 
  const flow = useFoundFlow(token);//Custom hook handling flow logic 

  if (flow.loading) return <p>Loading...</p>;
  if (flow.error) return  <NotFound
          title="Oops! Something wrong"
          message={
            <>
              It seems either you maxed out your attempts or something else is wrong.
              <strong
                className="d-block mt-2"
                style={{ color: "var(--nl-dark-navy)" }}
              >
                {" "}
                Thank you for trying to help!
              </strong>
            </>
          }
          icon="bi-qr-code-scan"
          buttonText="Explore Neverlose"
        />

  const getStepImage = () => {
    const images = {
      1: Step1Img,
      2: Step2Img,
      3: Step3Img,
    };
    return images[flow.step] || Step1Img;
  };

  const submit = async () => {
    if (flow.setIsSubmitting) flow.setIsSubmitting(true);

    const payload = {
      ...flow.reportData,
      photoUrl: flow.photoUrl,
      verificationAnswer: flow.verificationAnswer,
    };

    try {
      await publicApi.submitFoundReport(token, payload);
      flow.next();
    } catch (error) {
      console.error("Error submitting report", error);
       // Handle rate limit
  if (error?.response?.status === 429) {
    flow.setError({
      type: "RATE_LIMITED",
      message: "Too many submissions. Please try again later."
    });
    flow.next();
  }

  // Generic fallback
  flow.setError({
    type: "UNKNOWN",
    message: "Something went wrong. Please try again."
  });
flow.next();
    } finally {
      if (flow.setIsSubmitting) flow.setIsSubmitting(false);
    }
  };

  return (
    <>
      <Founder
        leftImage={getStepImage()}
        currentStep={flow.step}
        right={
          <div className="p-2 p-md-4">
            <ProgressBar step={flow.step} />

            {flow.step === 1 && (
              <Step1ItemPreview
                item={flow.item}
                answer={flow.verificationAnswer}
                setAnswer={flow.setVerificationAnswer}
                photoUrl={flow.photoUrl}
                seturl={flow.seturl}
                onNext={flow.next}
              />
            )}

            {flow.step === 2 && (
              <Step2Verification
                reportData={flow.reportData}
                setReportData={flow.setReportData}
                onSubmit={submit}
                onBack={flow.back}
                isLoading={flow.isSubmitting}
              />
            )}

            {flow.step === 3 && <Step3Success />}
          </div>
        }
      />
    </>
  );
}
