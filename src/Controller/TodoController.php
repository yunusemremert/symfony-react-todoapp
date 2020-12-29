<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="todo_api")
 */
class TodoController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var TodoRepository
     */
    private $todoRepository;

    /**
     * @param EntityManagerInterface $entityManager
     * @param TodoRepository $todoRepository
     */
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="todo_api_read")
     */
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="todo_api_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();

        $todo->setName($content->name);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            $data = $this->json([
                "error" => false,
                "message" => "!Todo has been created.",
                "todo" => $todo->toArray()
            ]);
        } catch (Exception $exception) {
            $data = $this->json([
                "error" => true,
                "message" => $exception->getMessage(),
                "todo" => null
            ]);
        }

        return $data;
    }

    /**
     * @Route("/update/{id}", name="todo_api_update", methods={"PUT"})
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo->setName($content->name);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->flush();

            $data = $this->json([
                "error" => false,
                "message" => "!Todo has been updated."
            ]);

        } catch (Exception $exception) {
            $data = $this->json([
                "error" => true,
                "message" => $exception->getMessage()
            ]);
        }

        return $data;
    }

    /**
     * @Route("/delete/{id}", name="todo_api_delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo): JsonResponse
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();

            $data = $this->json([
                "error" => false,
                "message" => "!Todo has been deleted."
            ]);

        } catch (Exception $exception) {
            $data = $this->json([
                "error" => true,
                "message" => $exception->getMessage()
            ]);
        }

        return $data;
    }
}
