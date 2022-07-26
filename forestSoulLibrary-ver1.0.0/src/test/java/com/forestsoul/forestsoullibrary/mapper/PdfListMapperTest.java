package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.PdfList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class PdfListMapperTest {

    @Autowired
   private PdfListMapper pdfListMapper;

    @Test
    public void testGetAll(){
        List<PdfList> lists = pdfListMapper.getAllPdfById(5);
        for (PdfList list:lists){
            System.out.println(list);
        }
    }
}
