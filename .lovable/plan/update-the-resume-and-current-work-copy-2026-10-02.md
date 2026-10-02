# Update the resume and current-work copy

## Changes
1. Replace the website’s downloadable resume with the newly uploaded `Christopher_Zarraga_Resume-3.pdf` and regenerate its inline preview from that exact file. Keep both under `public/media/` and continue resolving them through `media()` so Lovable and GitHub Pages work the same way.
2. Replace the “Right now” paragraph with the user’s supplied wording exactly, including frame-based monitoring, the AMD × Red Hat workshop, and the 2027 internship goal.
3. Align other site claims that directly conflict with the newer resume: describe the AIEA role as frame-monitoring research while retaining its documented SAC/CARLA/Kubernetes work, and change the Y Combinator expo year to 2026. Preserve the separately requested Tech4Good card and other personal stories not contradicted by the resume.
4. Confirm the preview opens, the PDF downloads, and the revised copy displays correctly on desktop and mobile.

## Technical notes
- The uploaded PDF is a one-page document; the existing PDF and its preview are served from `public/media/`.
- The current AIEA card emphasizes reinforcement learning, and the current expo slide says 2027; the new resume calls the role frame-monitoring research and lists the expo in 2026.
- The site currently renders the “Right now” text in section 03, and the resume viewer in section 04.
