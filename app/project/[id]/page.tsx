import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project) {
    <p>Failed to fetch project information</p>;
  }

  const project = result?.project;

  console.log(result?.project);

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={`/profile/${project?.createdBy?.id}`}>
            <Image
              src={project?.createdBy?.avatarUrl}
              width={50}
              height={50}
              className="rounded-full"
              alt="Profile image"
            />
          </Link>

          <div className="flex items-start gap-x-4 flex-col">
            <p className="font-semibold text-lg self-start">{project?.title}</p>
            <div className="user-info">
              <Link href={`/profile/${project?.createdBy?.id}`}>
                {project?.createdBy?.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${project?.category}`}
                className="text-primary-purple font-semibold"
              >
                {project?.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <Image
          src={project?.image}
          width={1064}
          height={798}
          alt="Thumbnail image"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{project?.description}</p>

        <div className="flex flex-wrap gap-6 mt-4">
          <Link
            href={project?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={project?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
    </Modal>
  );
};

export default Project;
